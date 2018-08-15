import {
    Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
    ComponentFactory,
    OnInit
} from '@angular/core';

import 'rxjs/add/operator/filter';


import { HomeComponent } from '../site-templates/home/home.component';
import { GeneralFunctionsService } from '../../general-functions.service';


@Component({
    selector: 'site-layout',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
    componentRef: any;
    siteTemplate: any = '<div class="jumbotron"> <h3>Something</h3> </div>'

    configs;
    @ViewChild('sitecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
    menuItems: any;
    postData: any;
    constructor(
        private resolver: ComponentFactoryResolver,
        private _gFunctions: GeneralFunctionsService) {
        this.menuItems = this._gFunctions.getMenuItems();
        this.configs = this._gFunctions.getConfigs();

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
