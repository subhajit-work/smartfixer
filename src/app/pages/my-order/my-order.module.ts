import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MyOrderPageRoutingModule } from './my-order-routing.module';

import { MyOrderPage } from './my-order.page';

import { SharedModule } from 'src/app/shared/shared.module';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    MatRippleModule, // Ripple module import
    MyOrderPageRoutingModule
  ],
  declarations: [MyOrderPage]
})
export class MyOrderPageModule {}
