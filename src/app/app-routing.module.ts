import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'screen-size',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'screen-size',
    loadChildren: () => import('./pages/screen-size/screen-size.module').then( m => m.ScreenSizePageModule)
  },
  {
    path: 'product-specifications',
    loadChildren: () => import('./pages/product-specifications/product-specifications.module').then( m => m.ProductSpecificationsPageModule)
  },
  {
    path: 'product-specifitions-details',
    loadChildren: () => import('./pages/product-specifitions-details/product-specifitions-details.module').then( m => m.ProductSpecifitionsDetailsPageModule)
  },
  {
    path: 'calculated-price',
    loadChildren: () => import('./pages/calculated-price/calculated-price.module').then( m => m.CalculatedPricePageModule)
  },
  {
    path: 'register-yourself',
    loadChildren: () => import('./pages/register-yourself/register-yourself.module').then( m => m.RegisterYourselfPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'password-success',
    loadChildren: () => import('./pages/password-success/password-success.module').then( m => m.PasswordSuccessPageModule)
  },
  {
    path: 'profile-page/:id',
    loadChildren: () => import('./pages/profile-page/profile-page.module').then( m => m.ProfilePagePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile-edit/:id',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'my-order',
    loadChildren: () => import('./pages/my-order/my-order.module').then( m => m.MyOrderPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'order-details',
    loadChildren: () => import('./pages/order-details/order-details.module').then( m => m.OrderDetailsPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
