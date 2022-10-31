import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatedPricePageRoutingModule } from './calculated-price-routing.module';

import { CalculatedPricePage } from './calculated-price.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    CalculatedPricePageRoutingModule
  ],
  declarations: [CalculatedPricePage]
})
export class CalculatedPricePageModule {}
