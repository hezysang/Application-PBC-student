import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'My Applications',         icon: 'nc-bank',       class: '' },
    { path: '/addStudent',    title: 'New Application',   icon: 'nc-single-02',    class: '' },

];

@Component({
    moduleId: module.id,
  // tslint:disable-next-line:component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
