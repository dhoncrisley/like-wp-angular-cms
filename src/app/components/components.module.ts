import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from 'app/components/login/login.component';
import { MatInputModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule } from '../../../node_modules/@angular/material';
import { FormsModule } from '../../../node_modules/@angular/forms';
// import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent
  ],
  entryComponents:[]
})
export class ComponentsModule { }
