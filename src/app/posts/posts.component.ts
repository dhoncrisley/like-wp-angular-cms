import { Component, OnInit, ViewChild,  ElementRef,  AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Post } from '../models/Post.model';
import { Category } from '../models/category.model';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';
import { MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FirestorePagerService } from 'app/_services/firestore-pager.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FirebaseError } from 'firebase';
import { Tag } from 'app/post-edit-create/post-edit-create.component';



const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements AfterViewInit, OnInit {
  postsRef: any;
  posts;
  pageEvent;
  categories: Array<Category>;
  tags: Array<Tag>;
  displayedColumns: string[] = ['check', 'thumb', 'title', 'author', 'categories', 'tags', 'date', 'modified', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Post>(true, []);
  lastChild: any;
  limit: 10;
  scrollPosition: any;
  confirmDialogRef: any;

  
  constructor(private _afs: AngularFirestore,
    public dialog: MatDialog,
    private _router: Router,
    private _gFunctions: GeneralFunctionsService,
    public _el: ElementRef,
    private _pager: FirestorePagerService = new FirestorePagerService(_afs)) {
      
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
    
    ngAfterViewInit() {
      
    }
    deletePost(post: Post){
      console.log('delete', post.title)
      this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: false
      });
      this.confirmDialogRef.componentInstance.confirmMessage = "Você tem certeza que deseja remover o post: " +  post.name.toLocaleUpperCase() + "?"
  
      this.confirmDialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this._gFunctions.getDb().collection('posts').doc(post.id).delete().then(res => {
            this._gFunctions.showNotification('success', 'center', "O post " + post.title + " foi removido com sucesso")
            //console.log(res)
          }, (err: FirebaseError) => {
            this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao remover o post selecionado, tente novamente. Erro: ' + err.message)
            //console.log(err);
          });
        }
        this.confirmDialogRef = null;
      });
      
    }
    ngOnInit() {
      this._pager.init('posts', 'date', { reverse: true, limit: 10 });

    this._afs.collection('categories')
      .valueChanges()
      .subscribe((cb: Array<Category>) => {
        this.categories = cb;
        return cb
      })
    this._afs.collection('tags')
      .valueChanges()
      .subscribe((cb: Array<Tag>) => {
        this.tags = cb;
        console.log(cb);
        return cb
      })
  }
 
  getCategory(category): any {
    try {
      const catName = this.categories.filter(item => item.id == category);
      return catName[0];
    } catch (error) {
      return 'excluída';
    }
  }
  getTag(tag): any {
    try {
      const tagName = this.tags.filter(item => item.id == tag);
      return tagName[0];
    } catch (error) {
      return 'excluída';
    }
  }

  newPost() {
    this._router.navigate(['admin/posts/new']);
  }

  editPost(postId) {
    this._router.navigate(['posts/' + postId]);
  }

  /* isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = 5;
    return numSelected === numRows;
  }


  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.posts.data.forEach(row => this.selection.select(row));
  } */
}
