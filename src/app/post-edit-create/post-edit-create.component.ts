import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Location } from '@angular/common';
// import { map } from '../../../node_modules/rxjs-compat/operator/map';
import { UploadTaskSnapshot } from 'angularfire2/storage/interfaces';
import { Observable } from 'rxjs';
import { Post } from '../models/Post.model';
import { Category } from '../models/category.model';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { GeneralFunctionsService } from '../general-functions.service';

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
  twoWayContent;
  content;
  froalaOptions = {
    heightMin: 320,
    placeholderText: "Escreva alguma coisa aqui"
  }
  options = {
    placeholderText: "Edit Me",
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    imageUploadMethod: 'POST',
    imageUploadURL: this.uploadImage(),
    events: {
      'froalaEditor.image.inserted': (e, editor, $img, response) => {
        //console.log(editor.selection.get());
        //console.log('Inserted evento', e);
        //console.log('Inserted resposta', response);
        //console.log('Inserted imagem', $img);


        //console.log(this.content);

      },
      //'froalaEditor.image.beforePasteUpload': (e, editor, img) => {
        //console.log('Paste evento', e)
        //console.log('Paste editor', editor)
        //console.log('Paste image', img)
        //console.log(this.twoWayContent);
      //},
      'froalaEditor.image.beforeUpload': (e, editor, images) => {
        console.log('Upload evento', e)
        console.log('Upload editor', editor)
        console.log('Upload images', images[0])
        //console.log(this.twoWayContent);
      },
    }
  }

  uploadPercent: Observable<number>;
  uploadComplete: boolean = false;
  thumbURL: firebase.storage.UploadTaskSnapshot;

  uploading: boolean;
  postDate: any;
  catRef: AngularFirestoreCollection;
  postsRef: AngularFirestoreCollection;
  newCategory: any;
  dbCategories: Observable<any[]>;
  postCategories: Array<any>;
  catForm: FormGroup;
  constructor(
    private _gFunctions: GeneralFunctionsService,
    private _storage: AngularFireStorage,
    private _afs: AngularFirestore,
    private _route: ActivatedRoute,
    private _location: Location,
    private _fb: FormBuilder) {

    this.catRef = this._afs.collection<Category>('categories');
    this.postsRef = this._afs.collection('posts')
  }

  uploadImage() {
    console.log('uploading image')
    return 'https://d1bcl7tdsf48aa.cloudfront.net/images/screenshots/quests2/01s.jpg'
  }
  ngOnInit() {

    this._route.params.subscribe(params => {
      if (params.id == "new") {
        this.title = 'Novo Post';
      } else {
        this.title = 'Editar Post';
        this.id = params.id;
        this.postData = this.postsRef.doc(params.id).ref.get()
          .then(res => {
            const data = res.data();
            this.content = data.post_content;
            this.postTitle = data.post_title;
            this.thumbURL = data.post_thumb;
            this.postDate = data.post_date;
            this.postCategories = data.post_categories;
            this.id = data.post_id;
          });

        this.id = this.postData.post_id;
        this.content = this.postData.post_content;
      }
    }, err => {
      console.log(err)
    });
    this.catForm = this._fb.group({
      cat_id: this._fb.array([])
    });
    this.dbCategories = this.catRef.valueChanges();
  }
  saveCategory() {
    const id = this._afs.createId();
    var category = {
      cat_id: id,
      cat_name: this.newCategory,
      cat_slug: this._gFunctions.replaceSpecialChars(this.newCategory),
      cat_active: true
    }
    this.catRef.doc(id).set(category);
    this.newCategory = undefined;
  }
  deleteCategory(category: Category) {
    this._afs.collection("categories").doc(category.cat_id).update({ cat_active: false }).then(() => {
      this._gFunctions.showNotification('success', 'center', "Categoria " + category.cat_name + " Deletada com sucesso!");

      console.log("Document successfully deleted!");

    }).catch(error => {
      this._gFunctions.showNotification('danger', 'center', "Erro ao deletar a categoria " + category.cat_name + ", tente novamente.");
      console.error("Error removing document: ", error);
    });
  }
  /* TODO: Consertar a seleção de categorias que ao editar um post 
  /quando selecionar uma categoria e já existiam categorias já definidas todas são desmarcadas exceto a que foi recentemente marcada */
  onCatChange(cat_id: string, isChecked: boolean) {

    var catFormArray = <FormArray>this.catForm.controls.cat_id;

    // console.log(catFormArray.controls[0].setValue(['asd', 'qwe']));


    if (isChecked) {
      //emailFormArray;
      catFormArray.push(new FormControl(cat_id))
      this.postCategories = catFormArray.value;
    } else {
      let index = catFormArray.controls.findIndex(x => x.value == cat_id)

      if (index !== -1) {
        //this.data.splice(index, 1);
      }
      catFormArray.removeAt(index);
      this.postCategories = this.catForm.value.cat_id;

    }
  }

  checkCategory(catId) {
    return this.postCategories ? (this.postCategories.filter(item => item == catId)).length : false;
  }
  savePost() {

    const id = this.id ? this.id : this._afs.createId();
    this.id = id;
    const date = this.postDate ? this.postDate : Date.now();
    this.postDate = date;
    this.postData = {
      post_id: id,
      post_content: this.content,
      post_title: this.postTitle,
      post_author: 'test admin',
      post_name: this._gFunctions.replaceSpecialChars(this.postTitle),
      post_thumb: this.thumbURL ? this.thumbURL : '',
      post_date: this.postDate,
      post_modified: Date.now(),
      post_tags: [1, 4, 2],
      post_categories: this.postCategories ? this.postCategories : []
    };
    this._afs.collection('posts/').doc(id).set(this.postData);
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
    }, (err: Error) => {
      console.log(err.message);
    }, () => {
      task.task.snapshot.ref.getDownloadURL().then((url: UploadTaskSnapshot) => {
        this.thumbURL = url;
        this.uploadComplete = true;
        this.uploading = false;
        console.log(this.thumbURL);
      });
    });

  }

}
