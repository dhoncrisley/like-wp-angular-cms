import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Post } from '../models/Post.model';
import { Observable } from 'rxjs/Observable';
import { Category } from '../models/category.model';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postsRef: any;
  posts: any;
  catsRef: any;
  categories: Array<Category>;

  constructor(private _afs: AngularFirestore,
    private _router: Router,
    private _gFunctions: GeneralFunctionsService) {

  }

  ngOnInit() {
    this.postsRef = this._afs.collection('posts');
    this.posts = this._gFunctions.getPosts();
    this.catsRef = this._afs.collection('categories').valueChanges().subscribe((cb: Array<Category>) => {
      this.categories = cb;
      return cb
    })

    //this.categorias = Observable.combineLatest()
    /*  this._afs.collection('posts').snapshotChanges().map(r => {
      var post:Post;
       console.log(r);
      r.map(a => {
         = post_id = a.payload.doc.id
        this.posts.push()
        console.log()
      });
    }) */
  }
  getCategory(category): any {
    // console.log(this.categories);
    const catName = this.categories.filter(item => item.cat_id == category);
    return catName[0] ? (catName[0]) : 'excluída';
  }
  newPost() {
    this._router.navigate(['admin/posts/new']);

  }
  editPost(postId) {
    this._router.navigate(['posts/' + postId]);

  }
}
