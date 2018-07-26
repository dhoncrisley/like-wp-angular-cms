import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Post } from '../post-edit-create/post-edit-create.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postsRef: any;
  posts: Array<Post>;

  constructor(private _afs: AngularFirestore,private _router:Router) { }

  ngOnInit() {
    this.postsRef = this._afs.collection('posts').valueChanges();
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
  newPost(){
    this._router.navigate(['posts/new']);
    
  }
  editPost(postId){
    this._router.navigate(['posts/'+ postId]);

  }
}
