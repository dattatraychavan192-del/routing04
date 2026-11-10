import { userRole } from './shared/model/auth';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/component/home/home.component';
import { ProductComponent } from './shared/component/product/product.component';
import { UserComponent } from './shared/component/user/user.component';
import { FairsComponent } from './shared/component/fairs/fairs.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { ProductInfoComponent } from './shared/component/product-info/product-info.component';
import { AuthComponent } from './shared/component/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { UserRoleGuard } from './guard/user-role.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRole: ['buyer', 'admin', 'superAdmin'],
    },
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard, UserRoleGuard],
    children: [
      {
        path: 'add',
        component: ProductFormComponent,
      },
      {
        path: ':id',
        component: ProductInfoComponent,
      },
      {
        path: ':id/edit',
        component: ProductFormComponent,
      },
    ],
    data: {
      userRole: ['buyer', 'admin', 'superAdmin'],
    },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRole: ['admin', 'superAdmin'],
    },
  },
  {
    path: 'fairs',
    component: FairsComponent,
    canActivate: [AuthGuard, UserRoleGuard],
    data: {
      userRole: ['superAdmin'],
    },
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    data: {
      msg: 'Page not found from static data',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
