import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonUtils } from '../../services/common-utils/common-utils';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  private changeDataSubscribe: Subscription;
  change_api:any;
  changeLoadData = false;
  changeReturnData : any;
  model: any = {};

  constructor( 
    private http : HttpClient, 
    private commonUtils : CommonUtils ,
    private router: Router,
  ) { }

  ngOnInit() {
    this.change_api='forgot-password';
    this.commonFunction();
    
  }
  ionViewWillEnter(){
    this.commonFunction();
  }
  commonFunction(){
   
  }

  onForgotPassword(form:NgForm){
    console.log("value",form.value);
    let fd = new FormData();

    for (let val in form.value) {
      if(form.value[val] == undefined){
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);

    };
    this.changeDataSubscribe = this.http.post(this.change_api, fd).subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.changeLoadData = false;
        this.changeReturnData = res.return_data;
        if(res.success > 0){
          this.commonUtils.presentToast('success', res.msg);
          this.router.navigateByUrl(`password-success`);
        }else {
          this.commonUtils.presentToast('error', res.msg);
        }
        
        
      },
      errRes => {
        this.changeLoadData = false;
        // this.commonUtils.presentToast('success', errRes.return_message);
      }
    );
  }

}
