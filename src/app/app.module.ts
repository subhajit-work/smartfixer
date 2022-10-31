import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { InterceptorProvider } from './services/interceptors/interceptor';
import { NgHttpLoaderModule } from 'ng-http-loader'; // <============loader

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    SharedModule, //share module import here
    IonicStorageModule.forRoot(),
    HttpClientModule,
    NgHttpLoaderModule.forRoot(), // <============ Don't forget to call 'forRoot()'!
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
