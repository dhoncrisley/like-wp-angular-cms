import { Routes } from '@angular/router';
import { HomeComponent } from '../site-templates/home/home.component';
import { SingleComponent } from 'app/layouts/site-templates/single/single.component';
import { SiteComponent } from './site.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

export const SiteRoutes: Routes = [
    /* {path: 'admin', component: AdminLayoutComponent, children: [
        {
          path: '',
          loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }]}, */
    {
        path: '', component: SiteComponent, children: [
            { path: '', component: HomeComponent, data: { title: 'Home' } },
            { path: 'post/:id', component: SingleComponent, data: { title: 'Post' } },
        ]
    }
];

