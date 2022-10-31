import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonUtils } from '../../services/common-utils/common-utils';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  private profileDataSubscribe: Subscription;
  paneltype: number;
  profile_Id: string;
  profile_Api: string;
  profiel_update:any;
  model: any = {};
  private changeDataSubscribe: Subscription;
  change_api:any;
  changeLoadData = false;
  changeReturnData : any;
  constructor( private http : HttpClient, private router: Router,private activatedRoute: ActivatedRoute , private commonUtils : CommonUtils) { }

  ngOnInit() {
    this.profiel_update = 'update-profile';
    this.commonFunction();
    
  }
  ionViewWillEnter(){
    this.commonFunction();
  }

  commonFunction(){
    this.profileData();
    
    
  }
  profileLoadData = false;
  profileReturnData;
  profileData(){
    this.profile_Id = this.activatedRoute.snapshot.params.id;
    console.log("ss>>>>", this.profile_Id);
    this.profile_Api="get-profile/"+ this.profile_Id;
    
    this.profileLoadData = true;
    this.profileDataSubscribe = this.http.get(this.profile_Api).subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.profileLoadData = false;
        this.profileReturnData = res.return_data;
        this.model = {
          name : res.return_data.name,
          birthdate : res.return_data.birthdate,
          email : res.return_data.email,
          phone : res.return_data.phone,
          pin_code : res.return_data.pin_code,
          address : res.return_data.address
          
        };
        console.log("profileReturnData",this.profileReturnData);
        
      },
      errRes => {
        this.profileLoadData = false;
      }
    );
  }

  profileDataUpdate(form:NgForm){
    console.log("value",form.value);
    let fd = new FormData();

    for (let val in form.value) {
      if(form.value[val] == undefined){
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);


    };
    fd.append("profile_id", this.profile_Id);
    this.changeDataSubscribe = this.http.post(this.profiel_update, fd).subscribe(
      (res:any) => {
        console.log('res', res);
        
        this.changeLoadData = false;
        this.changeReturnData = res.return_data;
        this.commonUtils.presentToast('success', res.msg);
        this.router.navigateByUrl(`profile-page/${this.profile_Id}`);
        
      },
      errRes => {
        this.changeLoadData = false;
        this.commonUtils.presentToast('success', errRes.return_message);
      }
    );
  }
  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.profileDataSubscribe !== undefined){
      this.profileDataSubscribe.unsubscribe();
    }
  }
  // destroy subscription end
}
