import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {

  centered = false;
  disabled = false;
  unbounded = false;
  registered=true;
  private myOrderDataSubscribe: Subscription;
  panelLoadData = false;
  myOrderReturnData;
  userId:any;


  radius: number;
  color: "#f0f1f9";

  constructor(private http : HttpClient,private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.myOrderData();
  }


  myOrderData(){
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.userId = res.user.id;

      }
    });
    this.panelLoadData = true;
    this.myOrderDataSubscribe = this.http.get('my-order/'+this.userId).subscribe(
      (res:any) => {
        this.panelLoadData = false;
        this.myOrderReturnData = res.return_data;
      },
      errRes => {
        this.panelLoadData = false;
      }
    );
  }

  goToOrderDetails(){
    let id =4;
    console.log("ok@@@@@@@@@ ",id);
    this.router.navigateByUrl(`order-details?id=${id}`);
  }

  goToLink(_id){
    let url = _id;
    console.log('url',url);
    
    window.open(url, "_blank");
  }

}
