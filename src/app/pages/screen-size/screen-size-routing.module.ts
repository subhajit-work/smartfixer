import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenSizePage } from './screen-size.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenSizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenSizePageRoutingModule {}
