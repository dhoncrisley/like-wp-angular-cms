import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
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
  MatSidenavModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SiteComponent } from './layouts/site/site.component';
import { SiteModule } from './layouts/site/site.module';
import { FroalaEditorModule, FroalaViewModule } from '../../node_modules/angular-froala-wysiwyg';
import { FirestorePagerService } from 'app/_services/firestore-pager.service';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyALz_kVrrdh7PjwOzJCSyG7oaPI-3wCEps",
    authDomain: "dotti-e8d92.firebaseapp.com",
    databaseURL: "https://dotti-e8d92.firebaseio.com",
    projectId: "dotti-e8d92",
    storageBucket: "dotti-e8d92.appspot.com",
    messagingSenderId: "612121511551"
  }
};
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SiteComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    SiteModule,
    AppRoutingModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
    MatSidenavModule
  ],
  providers: [FirestorePagerService],
  exports:[FroalaEditorModule, FroalaViewModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
