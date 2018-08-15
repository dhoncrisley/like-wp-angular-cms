import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/admin/configurations', title: 'Configurations',  icon:'settings', class: '' },
    { path: '/admin/posts', title: 'Posts',  icon:'create', class: '' },
    { path: '/admin/layout', title: 'Layout',  icon:'developer_board', class: '' },
    // { path: '/admin/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
