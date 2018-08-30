import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';

import { AngularFireAuth } from '../../../../node_modules/angularfire2/auth';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
    providers: [AngularFireAuth],
})
export class AdminLayoutComponent implements OnInit {
    private route: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    logged: boolean = false;

    constructor(private _gFunctions: GeneralFunctionsService,
        public location: Location,
        @Inject(DOCUMENT) private _document: HTMLDocument,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _afAuth: AngularFireAuth,
        private _titleService: Title) {
        this._afAuth.authState.subscribe(res => {
            if (!res) {
                this._router.navigateByUrl('admin/login');
                this.logged = false;
                // console.log(this.logged)
            } else {
                //console.log(this.logged)
                this.logged = true;
            }
        })
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
                //this._document.getElementById('appFavicon').setAttribute('href', '../../../assets/img/favicon.svg');
                this._titleService.setTitle('Dashboard - ' + event['title'])
            });

    }

    ngOnInit() {


        /* const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function

            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this._router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this.route = this._router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        } */
    }
    ngAfterViewInit() {
        //this.runOnRouteChange();
    }
    isMaps(path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    }
    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

}
