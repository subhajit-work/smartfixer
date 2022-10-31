import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-password-success',
  templateUrl: './password-success.page.html',
  styleUrls: ['./password-success.page.scss'],
})
export class PasswordSuccessPage implements OnInit {
  get_user_dtls;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.commoninfo();
  }

  ionViewWillEnter(){
    this.commoninfo();
  }

  commoninfo(){
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        console.log('this.get_user_dtls************', res.user);
        this.get_user_dtls = res.user;
      }
    });
  }

}
