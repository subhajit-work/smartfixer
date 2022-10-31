import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-screen-size',
  templateUrl: './screen-size.page.html',
  styleUrls: ['./screen-size.page.scss'],
})
export class ScreenSizePage implements OnInit {
  registered=true;
  private screensizeDataSubscribe: Subscription;
  screenOne: any;
  screenTwo: any;
  screenThree: any;
  screenFour: any;
  disabled:boolean=true;
  size: any;

  constructor( private http : HttpClient,private router: Router) { }

  ngOnInit() {
    this.commonFunction();
  }
  ionViewWillEnter(){
    this.commonFunction();
  }

  commonFunction(){
    this.panelData();
    
  }

  panelLoadData = false;
  screenReturnData;
  panelData(){
    this.panelLoadData = true;
    this.screensizeDataSubscribe = this.http.get('screen-size').subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.panelLoadData = false;
        this.screenReturnData = res.return_data;
      },
      errRes => {
        this.panelLoadData = false;
      }
    );
  }
  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.screensizeDataSubscribe !== undefined){
      this.screensizeDataSubscribe.unsubscribe();
    }
  }
//display size
setDisplaySize(size){
  this.size = '';
  console.log(size);
  this.size=size;
  this.disabled=false;
  
}
gotoProductPage(){
  let navigationExtras: NavigationExtras = {
    state: {
      paramvalue: this.size
    }
  };
  this.router.navigate(['/product-specifications'], navigationExtras);
}

  // destroy subscription end
  
}
