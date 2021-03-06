import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { PostsComponent } from '../../posts/posts.component';
import { PostEditCreateComponent } from '../../post-edit-create/post-edit-create.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { SiteLayoutComponent } from '../../site-layout/site-layout.component';
import { LoaderComponent } from '../../loader/loader.component';
import { WidgetModalComponent } from '../../widget-modal/widget-modal.component';
import { ConfigurationsComponent } from '../../configurations/configurations.component';
import { MonacoEditorModule } from 'ngx-monaco';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AddMenuDialogComponent } from 'app/add-menu-dialog/add-menu-dialog.component';
import { DragulaModule } from 'ng2-dragula';
import {
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatRippleModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatDividerModule,
  MatTreeModule,
  MatChipsModule
} from '@angular/material';
import { SafeCssPipe } from 'app/_pipes/safe-css.pipe';
import { SafeHtmlPipe } from 'app/_pipes/safe-html.pipe';
import { PagesComponent } from '../../pages/pages.component';
import 'rxjs/add/operator/mergeMap';
import { ScrollableDirective } from '../../scrolable.directive';
import { PageEditCreateComponent } from '../../page-edit-create/page-edit-create.component';



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
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    DragulaModule.forRoot(),
    MonacoEditorModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'dotti-e8d92'),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatTreeModule,
    MatChipsModule,
  ],
  declarations: [
    PostEditCreateComponent,
    PageEditCreateComponent,
    DashboardComponent,
    UserProfileComponent,
    PostsComponent,

    NotificationsComponent,
    SiteLayoutComponent,
    //LoaderComponent,
    SafeHtmlPipe,
    SafeCssPipe,
    WidgetModalComponent,
    ConfirmDialogComponent,
    AddMenuDialogComponent,
    ConfigurationsComponent,
    PagesComponent,
    ScrollableDirective,
  ],
  entryComponents: [
    WidgetModalComponent,
    ConfirmDialogComponent,
    AddMenuDialogComponent],
  exports: [
    SafeHtmlPipe,
    SafeCssPipe,
  ]

})

export class AdminLayoutModule { }
