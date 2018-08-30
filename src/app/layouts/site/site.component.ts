import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, Inject } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { HomeComponent } from '../site-templates/home/home.component';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/platform-browser';



@Component({
    selector: 'site-layout',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
    configs: any;
    componentRef: any;
    siteTemplate: any = '<div class="jumbotron"> <h3>Something</h3> </div>'


    @ViewChild('sitecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
    menuItems: any;
    postData: any;
    constructor(
        private resolver: ComponentFactoryResolver,
        private _gFunctions: GeneralFunctionsService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _titleService: Title,
        @Inject(DOCUMENT) private _document: HTMLDocument) {
        this.menuItems = this._gFunctions.getMenuItems();
        this.configs = this._gFunctions.getConfigs();
        
        this._router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this._activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((event) => {
                //console.log(event);
                this.configs.subscribe(res => {
                    this._document.getElementById('appFavicon').setAttribute('href', res.favicon);
                    this._titleService.setTitle(res.blogname + ' - ' + event['title'])
                })
            });

    }

    ngOnInit() {

    }
    createComponent(template) {
        this.entry.clear();
        const factory = this.resolver.resolveComponentFactory(HomeComponent);
        const componentRef = this.entry.createComponent(factory);
        componentRef.instance.template = template;
    }
    destroyComponent() {
        this.componentRef.destroy();
    }




}
