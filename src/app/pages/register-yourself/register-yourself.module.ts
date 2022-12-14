import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterYourselfPageRoutingModule } from './register-yourself-routing.module';

import { RegisterYourselfPage } from './register-yourself.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    RegisterYourselfPageRoutingModule
  ],
  declarations: [RegisterYourselfPage]
})
export class RegisterYourselfPageModule {}
