import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenSizePageRoutingModule } from './screen-size-routing.module';

import { ScreenSizePage } from './screen-size.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ScreenSizePageRoutingModule
  ],
  declarations: [ScreenSizePage]
})
export class ScreenSizePageModule {}
