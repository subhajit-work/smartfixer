import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSpecificationsPage } from './product-specifications.page';

const routes: Routes = [
  {
    path: '',
    component: ProductSpecificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSpecificationsPageRoutingModule {}
