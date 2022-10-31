import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordSuccessPageRoutingModule } from './password-success-routing.module';

import { PasswordSuccessPage } from './password-success.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    PasswordSuccessPageRoutingModule
  ],
  declarations: [PasswordSuccessPage]
})
export class PasswordSuccessPageModule {}
