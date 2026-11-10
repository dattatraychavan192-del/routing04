import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './shared/component/product/product.component';
import { HomeComponent } from './shared/component/home/home.component';
import { UserComponent } from './shared/component/user/user.component';
import { FairsComponent } from './shared/component/fairs/fairs.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { ProductInfoComponent } from './shared/component/product-info/product-info.component';
import { UserFormComponent } from './shared/component/user-form/user-form.component';
import { UserInfoComponent } from './shared/component/user-info/user-info.component';
import { NavComponent } from './shared/component/nav/nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './shared/component/auth/auth.component';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './shared/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    UserComponent,
    FairsComponent,
    ProductFormComponent,
    ProductInfoComponent,
    UserFormComponent,
    UserInfoComponent,
    NavComponent,
    AuthComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
