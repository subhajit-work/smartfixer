import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CommonUtils } from '../../services/common-utils/common-utils';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  private changeDataSubscribe: Subscription;
  change_api='change-password';
  shownewpassword=false;
  showoldpassword=false;
  get_user_dtls;
  constructor( 
    private http : HttpClient, 
    private commonUtils : CommonUtils ,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.commonFunction();
    
  }
  ionViewWillEnter(){
    this.commonFunction();
  }
  commonFunction(){
    // this.panelData();
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        console.log('this.get_user_dtls************', res.user);
        this.get_user_dtls = res.user;
      }
    });
  }

   // register type start
   changeLoadData = false;
   changeReturnData;
   onChangePassword(form:NgForm){
     this.changeLoadData = true;
     console.log("value",form.value);
      let fd = new FormData();
      fd.append('new_password', form.value.newpassword);
      fd.append('old_password', form.value.oldpassword);
      fd.append('user_id', this.get_user_dtls.id);


     this.changeDataSubscribe = this.http.post(this.change_api, fd).subscribe(
       (res:any) => {
         console.log('res', res);
         
         this.changeLoadData = false;
         this.changeReturnData = res.return_data;
         
         
         if(res.success > 0){
          this.commonUtils.presentToast('success', res.msg);
          console.log('success', res.return_message);
          this.router.navigateByUrl(`password-success`);
        }
       },
       errRes => {
         this.changeLoadData = false;
       }
     );
   }
   // register type end
 
     // ----------- destroy subscription start ---------
     ngOnDestroy() {
       if(this.changeDataSubscribe !== undefined){
         this.changeDataSubscribe.unsubscribe();
       }
     }
     // destroy subscription end

}
