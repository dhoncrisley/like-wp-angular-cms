import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ViewChild, ComponentRef, Input, Directive, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';

declare var $: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    [x: string]: any;
    @Input() template: string;
    posts;

    constructor(private _gFunctions: GeneralFunctionsService) {
        this.posts = _gFunctions.getPosts();
        this.activeWidgets = this._gFunctions.getDb().collection('activeWidgets').valueChanges();
    }
    ngOnInit() {

    }
}