import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PostsComponent } from '../../posts/posts.component';
import { PostEditCreateComponent } from '../../post-edit-create/post-edit-create.component';
import { SiteComponent } from '../site/site.component';
import { SiteLayoutComponent } from '../../site-layout/site-layout.component';
import { ConfigurationsComponent } from 'app/configurations/configurations.component';
import { LoginComponent } from 'app/components/login/login.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'posts/:id', component: PostEditCreateComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'layout', component: SiteLayoutComponent },
    { path: 'configurations', component: ConfigurationsComponent },

];