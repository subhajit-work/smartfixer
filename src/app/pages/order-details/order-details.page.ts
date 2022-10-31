import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  userId:any;
  OrderDataSubscribe:any;
  OrderReturnData:any;
  router: any;
  id: any;
  constructor(private http : HttpClient,private authService: AuthService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
      this.id = parseInt(params['id']);
     console.log("ok",this.id);
     
     });
     this.myOrderData();
  }

  myOrderData(){
   
 
    this.OrderDataSubscribe = this.http.get('single-order/'+this.id).subscribe(
      (res:any) => {
        console.log("!!!OK### ",res.return_data[0]);
        
        this.OrderReturnData = res.return_data;
      },
      errRes => {
        
      }
    );
  }

}
