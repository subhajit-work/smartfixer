import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterYourselfPage } from './register-yourself.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterYourselfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterYourselfPageRoutingModule {}
