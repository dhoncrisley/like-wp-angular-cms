import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteRoutes } from './site.routing';
import { HomeComponent } from '../site-templates/home/home.component';
import { SingleComponent } from '../site-templates/single/single.component';
import { TestDirective } from '../../test.directive';
import { SafeHtmlPipe, SafeCssPipe } from '../../widget-modal/widget-modal.component';
import { AngularFireAuth } from '../../../../node_modules/angularfire2/auth';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SiteRoutes),
    
  ],
  declarations: [
    HomeComponent,
    SingleComponent,
    TestDirective,
    
  ],
  exports:[
    TestDirective,
  ], providers: [
    AngularFireAuth
  ],
})

export class SiteModule {}
