import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SiteComponent } from './layouts/site/site.component';
import { SiteModule } from './layouts/site/site.module';
import { FroalaEditorModule, FroalaViewModule } from '../../node_modules/angular-froala-wysiwyg';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeCssPipe } from './safe-css.pipe';
import { DragulaModule } from 'ng2-dragula';



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
    /* AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }) */
  ],
  providers: [],
  exports:[FroalaEditorModule, FroalaViewModule],

  bootstrap: [AppComponent],
})
export class AppModule { }
