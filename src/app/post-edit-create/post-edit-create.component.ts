import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Location } from '../../../node_modules/@angular/common';
import { map } from '../../../node_modules/rxjs-compat/operator/map';
import { UploadTaskSnapshot } from '../../../node_modules/angularfire2/storage/interfaces';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-post-edit-create',
  templateUrl: './post-edit-create.component.html',
  styleUrls: ['./post-edit-create.component.scss']
})
export class PostEditCreateComponent implements OnInit {
  postData: any;
  title: string;
  id;
  postTitle;
  content;
  froalaOptions = {
    heightMin: 320,
    placeholderText: "Escreva alguma coisa aqui"
  }
  uploadPercent: Observable<number>;
  uploadComplete: boolean = false;
  ref: any;
  task: any;
  thumbURL: firebase.storage.UploadTaskSnapshot;
  uploading: boolean;
  constructor(
    private _storage: AngularFireStorage,
    private _afs: AngularFirestore,
    private _route: ActivatedRoute,
    private _location: Location) {

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      if (params.id == "new") {
        this.title = 'Novo Post';
      } else {
        this.title = 'Editar Post';
        this.id = params.id;
        this.postData = this._afs.collection<Post>('posts/').doc(params.id).ref.get()
          .then(res => {
            const data = res.data();
            this.content = data.post_content;
            this.postTitle = data.post_title;
            this.thumbURL = data.post_thumb;
            this.id = data.post_id;
          });

        this.id = this.postData.post_id;
        this.content = this.postData.post_content;
      }
    });
  }
  savePost() {

    const id = this.id ? this.id : this._afs.createId();
    this.id = id;
    this.postData = { post_id: id, post_content: this.content, post_title: this.postTitle, post_author: 'test admin',post_thumb: this.thumbURL ? this.thumbURL : '', post_date: Date.now(), post_tags: [1, 4, 2], post_categories: [0, 2, 3] };
    console.log(this.postData);
    this._afs.collection('posts/').doc(id).set(this.postData);
    console.log('post saved');
    this._location.back();
  }

  fileChanged($event) {
    this.uploadComplete = false;
    this.uploading = true;
    const id = this.id ? this.id : this._afs.createId();
    this.id = id;
    const path = 'images/posts/' + id + '/' + Date.now() + $event.target.files[0].name;
    var ref: AngularFireStorageReference = this._storage.ref(path);
    var task: AngularFireUploadTask = ref.put($event.target.files[0]);
    this.uploadPercent = task.percentageChanges();
    task.task.on('state_changed', (snapshot: UploadTaskSnapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      console.log(snapshot.state);
      switch (snapshot.state) {
        case 'PAUSED':
          console.log('Upload is paused');
          break;
        case 'RUNNING': 
          console.log('Upload is running');
          break;
      }
    }, (err:Error) => {
      console.log(err.message);
    }, () => {
      task.task.snapshot.ref.getDownloadURL().then((url:UploadTaskSnapshot) => {
        this.thumbURL = url;
        this.uploadComplete= true;
        this.uploading = false;
        console.log(this.thumbURL);
      });
    });

  }

}
export class Post {
  post_id: string;
  post_author?: number;
  post_date?: Date;
  post_date_gmt?: Date;
  post_tags: Array<any>;
  post_categories: Array<any>;
  post_content?: string;
  post_title?: string;
  post_excerpt?: string;
  post_status?: string;
  comment_status?: string;
  ping_status?: string;
  post_password?: string;
  post_name?: string;
  to_ping?: string;
  pinged?: string;
  post_modified?: Date;
  post_modified_gmt?: Date;
  post_content_filtered?: string;
  post_parent?: number;
  guid?: string;
  menu_order?: number;
  post_type?: string;
  post_mime_type?: string;
  comment_count?: number;
}