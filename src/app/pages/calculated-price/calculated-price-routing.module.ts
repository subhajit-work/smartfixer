import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatedPricePage } from './calculated-price.page';

const routes: Routes = [
  {
    path: '',
    component: CalculatedPricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatedPricePageRoutingModule {}
