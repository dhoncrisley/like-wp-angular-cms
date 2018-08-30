import { Component, OnInit, ViewChild, HostListener, ElementRef, HostBinding, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Page } from '../models/Page.model';
import { Category } from '../models/category.model';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';
import { MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FirestorePagerService } from 'app/_services/firestore-pager.service';
import { Post } from 'app/models/Post.model';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import { FirebaseError } from 'firebase';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  pages;
  catsRef: any;
  //pageEvent;
  categories: Array<Category>;
  displayedColumns: string[] = ['title', 'author', 'categories', 'date', 'modified', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Page>(true, []);
  lastChild: any;
  limit: 10;
  scrollPosition: any;
  confirmDialogRef: any;

  constructor(private _afs: AngularFirestore,
    private dialog: MatDialog,
    private _router: Router,
    private _gFunctions: GeneralFunctionsService,
    public _el: ElementRef,
    private _pager: FirestorePagerService) {

  }
  ngOnDestroy() {
    //console.log('destroyed')
    this._pager.reset();
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this._pager.more();
    }
  }

  ngOnInit() {
    this._pager.init('pages', 'date', { reverse: true });

    this.catsRef = this._afs.collection('categories')
      .valueChanges()
      .subscribe((cb: Array<Category>) => {
        this.categories = cb;
        return cb
      })
  }
  deletePage(page: Page) {
    console.log('delete', page.title)
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = "Você tem certeza que deseja remover a página: " + page.name.toLocaleUpperCase() + "?"
    this.confirmDialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        this._gFunctions.getDb().collection('pages').doc(page.id).delete().then(res => {
          this._gFunctions.showNotification('success', 'center', "A página " + page.title + " foi removida com sucesso")
        }, (err: FirebaseError) => {
          this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao remover a página selecionada, tente novamente. Erro: ' + err.message)
        });
      }
      this.confirmDialogRef = null;
    });
  }
  
  getCategory(category): any {
    try {
      const catName = this.categories.filter(item => item.cat_id == category);
      return catName[0];
    } catch (error) {
      return 'excluída';
    }
  }

  newPage() {
    this._router.navigate(['/admin/pages/new']);
  }

  editPage(pageId) {
    this._router.navigate(['pages/' + pageId]);
  }

}
