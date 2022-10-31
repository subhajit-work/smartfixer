import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-specifications',
  templateUrl: './product-specifications.page.html',
  styleUrls: ['./product-specifications.page.scss'],
})
export class ProductSpecificationsPage implements OnInit {


  /*Veriable*/
  private panelDataSubscribe: Subscription;
  private cabinetDataSubscribe: Subscription;
  private cercuitDataSubscribe: Subscription;
  private ramlistDataSubscribe: Subscription;
  private soundDataSubscribe: Subscription;
  private remotelistDataSubscribe: Subscription;
  private pcblistDataSubscribe: Subscription;
  private bluetoothlistDataSubscribe: Subscription;
  private warrantylistDataSubscribe: Subscription;

  panels=[
    // {value: 'IPS', viewValue: 'IPS'},
    {value: 'TN (Twisted Nematic)', viewValue: 'TN (Twisted Nematic)'},
    {value: 'VA (Vertical Alignment) panels', viewValue: 'VA (Vertical Alignment) panels'},
    {value: 'IPS', viewValue: 'IPS'},
  ];
  displaysize: any;
  constructor(
    private http : HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.displaysize = this.router.getCurrentNavigation().extras.state.paramvalue;
      console.log("this.paramvalue++++++++",this.displaysize);
      
    }
    this.commonFunction();
    
  }
  ionViewWillEnter(){
    this.commonFunction();
  }

  commonFunction(){
    this.panelData();
    this.cabinetData();
    this.cercuitData();
    this.ramlistData();
    this.soundData();
    this.remotelistData();
    this.pcblistData();
    this.bluetoothlistData();
    this.warrantylistData();
  }

  // pannel type startprivate router: Router,
  panelLoadData = false;
  panelReturnData;
  panelData(){
    this.panelLoadData = true;
    this.panelDataSubscribe = this.http.get('panel-type').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.panelLoadData = false;
        this.panelReturnData = res.return_data;
      },
      errRes => {
        this.panelLoadData = false;
      }
    );
  }
  // pannel type end

  // cabinet type start
  cabinetLoadData = false;
  cabinetReturnData;
  cabinetData(){
    this.cabinetLoadData = true;
    this.cabinetDataSubscribe = this.http.get('cabinet-list').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.cabinetLoadData = false;
        this.cabinetReturnData = res.return_data;
      },
      errRes => {
        this.cabinetLoadData = false;
      }
    );
  }
  // cabinet type end

  // cercuit type start
  cercuitLoadData = false;
  cercuitReturnData;
  cercuitData(){
    this.cercuitLoadData = true;
    this.cercuitDataSubscribe = this.http.get('cercuit-type').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.cercuitLoadData = false;
        this.cercuitReturnData = res.return_data;
      },
      errRes => {
        this.cercuitLoadData = false;
      }
    );
  }
  // cercuit type end

  // ramlist start
  ramlistLoadData = false;
  ramlistReturnData;
  ramlistData(){
    this.ramlistLoadData = true;
    this.ramlistDataSubscribe = this.http.get('ramlist').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.ramlistLoadData = false;
        this.ramlistReturnData = res.return_data;
      },
      errRes => {
        this.ramlistLoadData = false;
      }
    );
  }
  // ramlist end

  // sound type start
  soundLoadData = false;
  soundReturnData;
  soundData(){
    this.soundLoadData = true;
    this.soundDataSubscribe = this.http.get('sound-output').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.soundLoadData = false;
        this.soundReturnData = res.return_data;
      },
      errRes => {
        this.soundLoadData = false;
      }
    );
  }
  // sound type end

  // remotelist type start
  remotelistLoadData = false;
  remotelistReturnData;
  remotelistData(){
    this.remotelistLoadData = true;
    this.remotelistDataSubscribe = this.http.get('get-remotelist').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.remotelistLoadData = false;
        this.remotelistReturnData = res.return_data;
      },
      errRes => {
        this.remotelistLoadData = false;
      }
    );
  }
  // remotelist type end

  // pcblist type start
  pcblistLoadData = false;
  pcblistReturnData;
  pcblistData(){
    this.pcblistLoadData = true;
    this.pcblistDataSubscribe = this.http.get('pcb-list').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.pcblistLoadData = false;
        this.pcblistReturnData = res.return_data;
      },
      errRes => {
        this.pcblistLoadData = false;
      }
    );
  }
  // pcblist type end

  // bluetoothlist type start
  bluetoothlistLoadData = false;
  bluetoothlistReturnData;
  bluetoothlistData(){
    this.bluetoothlistLoadData = true;
    this.bluetoothlistDataSubscribe = this.http.get('get-bluetooth').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.bluetoothlistLoadData = false;
        this.bluetoothlistReturnData = res.return_data;
      },
      errRes => {
        this.bluetoothlistLoadData = false;
      }
    );
  }
  // bluetoothlist type end

  // warrantylist type start
  warrantylistLoadData = false;
  warrantylistReturnData;
  warrantylistData(){
    this.warrantylistLoadData = true;
    this.warrantylistDataSubscribe = this.http.get('warranty-list').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.warrantylistLoadData = false;
        this.warrantylistReturnData = res.return_data;
      },
      errRes => {
        this.warrantylistLoadData = false;
      }
    );
  }
  // warrantylist type end

  productChoose(form:NgForm){
    console.log("this.displaysize.........",this.displaysize);
    
    console.log("add form submit >", form.value);
    this.router.navigateByUrl(`product-specifitions-details?paneltype=${form.value.panaltype.id}&display_size=${this.displaysize}&cabinettype=${form.value.cabinettype}&cercuittype=${form.value.cercuittype}&ramlisttype=${form.value.ramlisttype}&soundtype=${form.value.soundtype}&remotelisttype=${form.value.remotelisttype}&ramlisttype=${form.value.ramlisttype}&remotelisttype=${form.value.remotelisttype}&bluetoothlisttype=${form.value.bluetoothlisttype}&warrantylisttype=${form.value.warrantylisttype}&paneltypeCost=${form.value.panaltype.price}&pcbtype=${form.value.pcbtype}`);

    // http://localhost:8100/#/product-specifitions-details?paneltype=1&cabinettype=2&cercuittype=1&ramlisttype=1&ramlisttype=1&soundtype=1&remotelisttype=1&remotelisttype=1&bluetoothlisttype=1&warrantylisttype=1&paneltypeCost=0.00
  }


  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.panelDataSubscribe !== undefined){
      this.panelDataSubscribe.unsubscribe();
    }
    if(this.cabinetDataSubscribe !== undefined){
      this.cabinetDataSubscribe.unsubscribe();
    }
    if(this.cercuitDataSubscribe !== undefined){
      this.cercuitDataSubscribe.unsubscribe();
    }
    if(this.ramlistDataSubscribe !== undefined){
      this.ramlistDataSubscribe.unsubscribe();
    }
    if(this.soundDataSubscribe !== undefined){
      this.soundDataSubscribe.unsubscribe();
    }
    if(this.remotelistDataSubscribe !== undefined){
      this.remotelistDataSubscribe.unsubscribe();
    }
    if(this.pcblistDataSubscribe !== undefined){
      this.pcblistDataSubscribe.unsubscribe();
    }
    if(this.bluetoothlistDataSubscribe !== undefined){
      this.bluetoothlistDataSubscribe.unsubscribe();
    }
    if(this.warrantylistDataSubscribe !== undefined){
      this.warrantylistDataSubscribe.unsubscribe();
    }
  }
  // destroy subscription end

}
