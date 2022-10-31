import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {

  private logoutDataSubscribe : Subscription;
  private userDataSubscribe : Subscription;
  getUserDetails;
  

  constructor(
    private authService: AuthService,
    private commonUtils : CommonUtils,
    private http : HttpClient,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {

    this.logoutDataSubscribe = this.authService.globalparamsData.subscribe(res => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        console.log('this.get_user_dtls************', res.user);
        this.userDataGet(res.user.id);
        // user details set
        this.commonUtils.onSigninStudentInfo(res.user);
      }
    });

  }

  menuEnable = true;
  toggleMenu() {
    this.menuEnable =! this.menuEnable;
    console.log('click menu button');
    this.menuCtrl.enable(true);
    // this.menuCtrl.toggle();

    
  }

  userDataGet(_id){
      this.userDataSubscribe = this.http.get('get-profile/'+_id).subscribe(
        (res:any) => {
          this.getUserDetails = res.return_data;
          
      },
      errRes => {
      }
    );
    
  }

  ngOnDestroy() {
    if(this.logoutDataSubscribe !== undefined){
      this.logoutDataSubscribe.unsubscribe();
    }
    if(this.userDataSubscribe !== undefined){
      this.userDataSubscribe.unsubscribe();
    }
  }

}
