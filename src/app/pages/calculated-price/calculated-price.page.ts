import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from "@angular/common";
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from '../../services/common-utils/common-utils';


@Component({
  selector: 'app-calculated-price',
  templateUrl: './calculated-price.page.html',
  styleUrls: ['./calculated-price.page.scss'],
})
export class CalculatedPricePage implements OnInit {
  totalPrice;
  paneltype;
  cabinettype;
  cercuittype;
  ramlisttype;
  soundtype;
  remotelisttype;
  pcbtype;
  bluetoothlisttype;
  warrantylisttype;
  paneltypeCost;
  private priceCalculateSubscribe: Subscription;
  paramvalue:any;
  apiendpoint:any;
  fd :any;
  placeOrderSubscribe:any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private http : HttpClient,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private commonUtils : CommonUtils,
  ) { }

  ngOnInit() {
    this.fd = new FormData();
    this.apiendpoint="create-order";
    if (this.router.getCurrentNavigation().extras.state) {
      this.paramvalue = this.router.getCurrentNavigation().extras.state.paramvalue;
      console.log("%%%%this.paramvalue%%%");
      console.log("%%%%this.paramvalue%%%",this.paramvalue);
      
    }
    this.commoninfo();
  }

  ionViewWillEnter(){
    
  //  this.commoninfo();
  }

  commoninfo(){
  //   this.activatedRoute.queryParams.subscribe(params => {
  //     this.paneltype = parseInt(params['paneltype']);
  //     this.cabinettype = parseInt(params['cabinettype']);
  //     this.cercuittype = parseInt(params['cercuittype']);
  //     this.ramlisttype = parseInt(params['ramlisttype']);
  //     this.soundtype = parseInt(params['soundtype']);
  //     this.remotelisttype = parseInt(params['remotelisttype']);
  //     this.pcbtype = parseInt(params['pcbtype']);
  //     this.bluetoothlisttype = parseInt(params['bluetoothlisttype']);
  //     this.warrantylisttype = parseInt(params['warrantylisttype']);
  //     this.paneltypeCost = parseInt(params['paneltypeCost']);
  //   // });
    

    this.calculatePrice();
  }

  // calculate price start
  calculatePrice(){
    console.log("%%%%lok%%%%",this.paramvalue.ramlisttype);
    
    this.fd = new FormData();
    this.fd.append('display_id', this.paramvalue.display_size);
    this.fd.append('pcb_id', this.paramvalue.pcbtype);
    this.fd.append('ram_id', this.paramvalue.ramlisttype[0]);
    this.fd.append('bluetooth_id', this.paramvalue.bluetoothlisttype);
    this.fd.append('remote_id', this.paramvalue.remotelisttype[0]);
    this.fd.append('sound_id', this.paramvalue.soundtype);
    this.fd.append('warranty_id', this.paramvalue.warrantylisttype);
    this.fd.append('panel_type_id', this.paramvalue.paneltype);
    this.fd.append('cabinet_type_id', this.paramvalue.cabinettype);
    this.fd.append('circuite_id', this.paramvalue.cercuittype);
    this.fd.append('margin_cost', this.paramvalue.paneltypeCost);


    
    console.log("add form submit >", this.fd);

    this.priceCalculateSubscribe = this.http.post('caculate-price', this.fd).subscribe(
      (res:any) => {
        console.log('res', res);
          this.fd.append('order_amount',res.total_price);
          this.totalPrice = res.total_price;
      },
      errRes => {
      }
    );
  }
  // calculate price end

  //place order by soumen
  placeOrder(){

    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        console.log('this.get_user_dtls************', res.user);
        this.fd.append('user_id',res.user.id);
      }
    });
    this.fd.delete('margin_cost');
    this.fd.append('order_status',1);
   
    this.placeOrderSubscribe = this.http.post(this.apiendpoint, this.fd).subscribe(
      (res:any) => {
        
        if(res.success > 0){
          this.commonUtils.presentToast('success', res.msg);
          window.location.reload();
        }
      },
      errRes => {
      }
    );

  }

  myBackButton(){
    this.location.back();
  }

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.priceCalculateSubscribe !== undefined){
      this.priceCalculateSubscribe.unsubscribe();
    }
  }
  // destroy subscription end
  
  

}
