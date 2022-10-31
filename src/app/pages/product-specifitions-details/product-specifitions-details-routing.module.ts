import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSpecifitionsDetailsPage } from './product-specifitions-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProductSpecifitionsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSpecifitionsDetailsPageRoutingModule {}
