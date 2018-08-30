import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PostsComponent } from '../../posts/posts.component';
import { PostEditCreateComponent } from '../../post-edit-create/post-edit-create.component';
import { SiteLayoutComponent } from '../../site-layout/site-layout.component';
import { ConfigurationsComponent } from 'app/configurations/configurations.component';
import { PagesComponent } from 'app/pages/pages.component';
import { PageEditCreateComponent } from '../../page-edit-create/page-edit-create.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', component: DashboardComponent, data: { title: 'Início' }  },
    { path: 'dashboard', component: DashboardComponent, data: { title: 'Início' } },
    { path: 'user-profile', component: UserProfileComponent, data: { title: 'Perfil' } },
    { path: 'posts', component: PostsComponent, data: { title: 'Posts' } },
    { path: 'pages', component: PagesComponent, data: { title: 'Páginas' } },
    { path: 'posts/:id', component: PostEditCreateComponent, data: { title: 'Post' } },
    { path: 'pages/:id', component: PageEditCreateComponent, data: { title: 'Página' } },
    { path: 'notifications', component: NotificationsComponent, data: { title: 'Notificações' } },
    { path: 'layout', component: SiteLayoutComponent, data: { title: 'Layout' } },
    { path: 'configurations', component: ConfigurationsComponent, data: { title: 'Configurações' } },

];