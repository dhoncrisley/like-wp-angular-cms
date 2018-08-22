import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteRoutes } from './site.routing';
import { HomeComponent } from '../site-templates/home/home.component';
import { SingleComponent } from '../site-templates/single/single.component';

import { AngularFireAuth } from '../../../../node_modules/angularfire2/auth';
import { FroalaEditorModule, FroalaViewModule } from '../../../../node_modules/angular-froala-wysiwyg';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SiteRoutes),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    SingleComponent,


    
  ],
  exports:[

  ], providers: [
    AngularFireAuth
  ],
})

export class SiteModule {}
