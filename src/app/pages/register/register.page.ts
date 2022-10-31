import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CommonUtils } from '../../services/common-utils/common-utils';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private registerDataSubscribe: Subscription;
  register_api='user-signup';
  model: any = {};
  
  constructor(
    private http : HttpClient, 
    private commonUtils : CommonUtils,
    private router : Router,
  ) { }
  
  ngOnInit() {
    this.commonFunction();
    
  }
  ionViewWillEnter(){
    this.commonFunction();
  }
  commonFunction(){
    // this.panelData();
  }

  // register type start
  registerLoadData = false;
  registerReturnData;
  onregister(form:NgForm){
    this.registerLoadData = true;
    console.log("value",form.value);
    
    // get form value
    let fd = new FormData();
    // fd.append('image', this.model.birth_date);
    
    for (let val in form.value) {
      if(form.value[val] == undefined){
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);

    };

    if(!form.valid){
      return;
    }

    this.registerDataSubscribe = this.http.post(this.register_api, fd).subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.registerLoadData = false;
        this.registerReturnData = res.return_data;
        this.commonUtils.presentToast('success', res.msg);
        console.log('success', res.return_message);
        form.reset();
        this.router.navigateByUrl('/auth');
      },
      errRes => {
        this.registerLoadData = false;
      }
    );
  }
  // register type end


  // Date format change start
  changeDateFormat(_identifier, _date){
    console.log('_date', _date);
    console.log('_identifier', _identifier);

    if(_identifier == 'birth_date') {
      this.model.birth_date = moment(_date).format('YYYY-MM-DD');
    }

  }
  // Date format change end

    // ----------- destroy subscription start ---------
    ngOnDestroy() {
      if(this.registerDataSubscribe !== undefined){
        this.registerDataSubscribe.unsubscribe();
      }
    }
    // destroy subscription end

}
