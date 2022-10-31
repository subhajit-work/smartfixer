import { Component, Renderer2, Inject, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Subscription, observable } from 'rxjs';
import { take } from 'rxjs/operators';


import { AuthService } from './services/auth/auth.service';
import { CommonUtils } from './services/common-utils/common-utils';

import { environment } from '../environments/environment';

import { ResponsiveService } from './services/responsive.service'; //responive check
import { DOCUMENT } from '@angular/common';
import { Spinkit } from 'ng-http-loader'; // <============Loader

/* tslint:disable */ 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  public spinnerStyle = Spinkit;

  // variable define
  url_name;
  url_path_name;
  get_user_type;
  panelOpenState: boolean;
  userInfodDataLoading;
  private userInfoSubscribe: Subscription;
  private logoutDataSubscribe: Subscription;
  private groupMenuDataSubscribe : Subscription;
  private userDataSubscribe : Subscription;
  menuPages = [];
  menuPagesList;
  menuPages2 = [];
  activeMenuHilight;
  selectedItemActive;
  parentSelectedIndex;
  childSelectedIndex;
  siteInfo : any;
  isActive : boolean = false;
  siteInfoLoading;
  checkAuthentication;
  headerData;
  get_user_dtls;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private activatedRoute : ActivatedRoute,
    private http : HttpClient,
    private authService : AuthService,
    private responsiveService : ResponsiveService,
    private menuCtrl: MenuController,
    private renderer: Renderer2,
    private router : Router,
    private navCtrl : NavController,
    private commonUtils: CommonUtils, // common functionlity come here
    @Inject(DOCUMENT) private _document: HTMLDocument //use for fabicon
  ) {
    
    this.authService.autoLogin().pipe(
      take(1)
    ).subscribe(resData => {
      console.log('resData +++++++++++++++++++++++++++++++=&&&&&& (autoLogin)>', resData);
      if(resData){
        this.checkAuthentication = true;
        this.initializeApp();
        // console.log('HAVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
        this.onSiteInformation();
        // user details get
        
        this.userDataGet();
      }else{
        this.checkAuthentication = false;
        this.onSiteInformation();
        // console.log('NNNNNNNNNNNNNOT HAVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
      }
    });
    

    // this.onSiteInformation();
    // this.initializeApp();

  }

  ngOnInit(){
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        // console.log('Mobile device detected');

        // menu show true
        this.menuCtrl.enable(true);
      }
      else{
        // console.log('Desktop detected');

        // menu show false
        this.menuCtrl.enable(false);
      }
    });
    this.onResize('');   
    
    this.logoutDataSubscribe = this.authService.globalparamsData.subscribe(res => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        console.log('this.get_user_dtls************', res.user);
        // this.userDataGet(res.user.id);
        // user details set
        this.commonUtils.onSigninStudentInfo(res.user);
        this.userDataGet();
      }
    });
  }

  onResize(e){
    this.responsiveService.checkWidth();
  }

  initializeApp() {
    this.logoutDataSubscribe = this.authService.globalparamsData.subscribe(res => {
      console.log('(header)  globalparamsData res ssss >>>>>>>>>>>', res);
      if(res != null || res != undefined){
        console.log('this.get_user_dtls************', res.user);
        // user details set
        this.commonUtils.onSigninStudentInfo(res.user);
      }
    });
    this.platform.ready().then(() => {
      this.splashScreen.hide();

      // user data call
      this.userInfoData();
      
      // ----get current active url name start---
        this.activatedRoute.url.subscribe(activeUrl => {
          this.url_name = window.location.pathname;
          console.log('this.url_name app.componet.ts @@@>>', this.url_name.split('/')[1]);
        })
        
      //get current active url name end

      // observable data for all page url name get
      this.commonUtils.pagePathNameAnywhereObsv.subscribe(pathRes => {
        // console.log('common utility path page url name #### @@@@@@@ >>', pathRes);
        this.url_path_name = pathRes;
      });

    });
  }
  //------------------- menu item show start------------------------

  

  // menu data call
  mapped;
  userInfoData(){

    // console.log('main componentttttttttttttttttttttttttttttttttttttt');

    this.menuPages = [];
    this.userInfodDataLoading = false;

    this.commonUtils.getSiteInfoObservable
    .pipe(
      take(1)
    ).subscribe(res => {

      console.log('componet.ts Toke store >>>>>>>>>>>>>>>111', res);
      this.headerData = res;
      //--- auto login check for website start ---

      // this.authService.autoLoginWebsite();

      /* let aa = this.authService.autoLoginWebsite();
      aa.subscribe(res => {
      console.log('aa 22 >>>>>>>>>', res);
      }) */
      // auto login check for website end

      this.menuPages = [];


      const parsedUrl = new URL(window.location.href);
      const baseUrl = parsedUrl.hostname;
      //console.log('parsedUrl> ', parsedUrl);
      console.log('baseUrl> ', baseUrl); // this will print http://example.com or http://localhost:4200
      if(baseUrl == 'localhost' || baseUrl == '192.168.0.10'){
        this.site_url_name = 'https://www.online-restaurent.bongtechsolutions.com/#/home';
      }else{
        this.site_url_name = window.location.href;
      }
      

      this.userInfodDataLoading = true;
      
    });
  }

   // ============site information get start =============
   site_path;
   site_href;
   site_href_split;
   site_path_split;
   site_url_name;
   onSiteInformation(){
     // console.log('this.url_name app.componet.ts  pathname @@@>>',  window.location.pathname);
 
     this.site_path = window.location.pathname;
     this.site_href = window.location.href;
     this.site_href_split = window.location.href.split('/')[1];
     this.site_path_split = window.location.pathname.split('/')[1];
 
     // server print reasult///////
     /* site_path > /ci/xcelero/online/ 
     site_href > https://www.online-restaurent.bongtechsolutions.com/#/home 
     site_href_split > 
     site_path_split > ci  */
 
     const parsedUrl = new URL(window.location.href);
     const baseUrl = parsedUrl.hostname;
     //console.log('parsedUrl> ', parsedUrl);
     console.log('baseUrl> ', baseUrl); // this will print http://example.com or http://localhost:4200
     if(baseUrl == 'localhost' || baseUrl == '192.168.0.10'){
       this.site_url_name = 'https://www.online-restaurent.bongtechsolutions.com/#/home';
     }else{
       this.site_url_name = window.location.href;
     }

     console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww >', this.checkAuthentication);
     this.siteInfoLoading = true;
     
   }

  // ================== view data fetch start =====================
  userDataGet(){
    this.authService.globalparamsData.subscribe(res => {
      this.userDataSubscribe = this.http.get('get-profile/'+res.user.id).pipe(
        take(1)
        ).subscribe(
        (res:any) => {
          // this.viewLoadData = false;
          console.log("view data  res -------------------header ss ->", res.return_data);
          if(res.success > 0){
            this.get_user_dtls = res.return_data;
  
            // user details set
            this.commonUtils.onSigninStudentInfo(res.return_data.userinfo);
          }
        },
        errRes => {
          // this.viewLoadData = false;
        }
      );
    });
    
  }
  // view data fetch end

  //  page go
  addClass: boolean = false;
  goToPage(_url, _item){
    console.log('goToPage _url >', _url);
    console.log('goToPage _item >', _item);
    // this.router.navigateByUrl(_url);

    this.navCtrl.navigateRoot(_url);
    // _item.addClass = !_item.addClass;   
    
    /* this.main_menu.forEach(element => {
      element.addClass = false;
    });

    if(_item){
      _item.addClass = true;
    } */
  }

  // Logout start
  logOutUser() {
    this.authService.logout();
  }
  // Logout end

  // Close menu start
  closeModal() {
    console.log('Clicked');
    this.menuCtrl.enable(false);
    // this.menuCtrl.toggle();
  }
  // close menu end

}
