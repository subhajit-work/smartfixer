import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    MatCheckboxModule, //Material checkbox import
    AuthPageRoutingModule
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
