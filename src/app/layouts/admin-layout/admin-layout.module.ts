import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PostsComponent } from '../../posts/posts.component';

import {
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { PostEditCreateComponent } from '../../post-edit-create/post-edit-create.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { SiteComponent } from '../site/site.component';
import { SiteLayoutComponent} from '../../site-layout/site-layout.component';
import { LoaderComponent } from '../../loader/loader.component';
import { WidgetModalComponent, SafeHtmlPipe, SafeCssPipe } from '../../widget-modal/widget-modal.component';
import { ConfigurationsComponent } from '../../configurations/configurations.component';
import { SingleComponent } from '../site-templates/single/single.component';
import { MonacoEditorModule } from 'ngx-monaco';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { LoginComponent } from 'app/components/login/login.component';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
export const environment = {
  production: false,
  firebase: {
    apiKey: "",
    authDomain: "dotti-e8d92.firebaseapp.com",
    databaseURL: "https://dotti-e8d92.firebaseio.com",
    projectId: "dotti-e8d92",
    storageBucket: "dotti-e8d92.appspot.com",
    messagingSenderId: "612121511551"
  }
};
@NgModule({
  providers: [AngularFireAuth],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MonacoEditorModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'dotti-e8d92'),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    PostEditCreateComponent,
    DashboardComponent,
    UserProfileComponent,
    TypographyComponent,
    PostsComponent,
    NotificationsComponent,
    SiteLayoutComponent,
    LoaderComponent,
    WidgetModalComponent,
    ConfirmDialogComponent,
    ConfigurationsComponent,
    SafeHtmlPipe,
    SafeCssPipe,
  ], entryComponents: [WidgetModalComponent, ConfirmDialogComponent]  
})

export class AdminLayoutModule {}
