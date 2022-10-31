import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  private formSubmitSubscribe: Subscription;
  api_url;
  model: any = {};


  constructor(
    private loadingController: LoadingController,
    private authService:AuthService,
    private router: Router,
    private modalController : ModalController,
    private commonUtils: CommonUtils, // common functionlity come here
  ) { }

  ngOnInit() {
    this.api_url = 'user-login';
  }

  //---------------- login form submit start-----------------
  onSubmitSingInForm(form:NgForm){
    this.isLoading = true;
    console.log('form >>', form.value);
    if(!form.valid){
      return;
    }
    let fd = new FormData();

    for (let val in form.value) {
      if(form.value[val] == undefined){
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);

    };

    this.authenticate(form, fd);
    // form.reset();

  }

  // authenticate function
  authenticate(_form, form_data) {
    this.isLoading = true;
    this.loadingController
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<any>;
        authObs = this.authService.login(this.api_url, form_data, '')
        
        this.formSubmitSubscribe = authObs.subscribe(
          resData => {
            console.log('resData ============= (sign in) ))))))))))))))>', resData);
            if(resData.success > 0)
            {
              console.log('user Type =============))))))))))))))>', resData.return_data.user);
              
              this.router.navigateByUrl('/screen-size');
              // service 
              
              this.commonUtils.onClicksigninCheck(resData.return_data.user);

              // user details set
              this.commonUtils.onSigninStudentInfo(resData.return_data.user);
              
              setTimeout(() => {
                _form.reset();
                loadingEl.dismiss();
                // this.modalController.dismiss('submitClose');
                this.commonUtils.presentToast('success', resData.msg);
              }, 2000);
    
            }else{
              loadingEl.dismiss();
              this.commonUtils.presentToast('error', resData.msg);
            }
            
            // console.log("data login after resData ++++++>", resData);
            this.isLoading = false;
            // loadingEl.dismiss();
            // this.router.navigateByUrl('/places/tabs/discover');
          },
          errRes => {
            loadingEl.dismiss();
            this.isLoading = false;
          }
        );
      });
  }
// login form submit end

}
