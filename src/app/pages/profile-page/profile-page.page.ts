import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {
  private profileDataSubscribe: Subscription;
  paneltype: number;
  profile_Id: string;
  profile_Api: string;
 
  constructor( private http : HttpClient, private router: Router,private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
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
        console.log("profileReturnData",this.profileReturnData);
        
      },
      errRes => {
        this.profileLoadData = false;
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
