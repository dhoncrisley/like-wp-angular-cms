import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SiteComponent } from './layouts/site/site.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  /* {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  }, */
  {
    path: 'admin/login',
    component: LoginComponent,
    children: [
      {
        path: '',
        loadChildren: './components/components.module#ComponentsModule'
      },
    ]
  }, 
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  }, 
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/site/site.module#SiteModule'
      }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
