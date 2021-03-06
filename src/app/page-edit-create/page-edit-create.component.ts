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

import { Http } from '../../../node_modules/@angular/http';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';

@Component({
  selector: 'app-page-edit-create',
  templateUrl: './page-edit-create.component.html',
  styleUrls: ['./page-edit-create.component.scss']
})
export class PageEditCreateComponent implements OnInit {
  postData: any;
  title: string;
  id;
  postTitle;
  content;

  options = {
    heightMin: 400,
    heightMax: 600,
    placeholderText: "Escreva o conteúdo da página aqui",
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    imageUploadMethod: 'GET',
    imageManagerPageSize: 10,
    imageManagerPreloader: '../../assets/img/gears.gif',
    imageManagerDeleteParams: { exclude: true },
    imageManagerDeleteURL: 'http://localhost:5000/dotti-e8d92/us-central1/deleteImage',
    imageManagerLoadURL: 'http://localhost:5000/dotti-e8d92/us-central1/loadImages',
    events: {

      'froalaEditor.image.beforeUpload': (e, editor, response) => {
        //ARRUMAR SABAGAÇA DEPOIS
        this.imageUploading = true;
        const id = this._afs.createId();
        const path = 'images/pages/' + id + '/' + Date.now() + response[0].name;
        var ref: AngularFireStorageReference = this._storage.ref(path);
        var task: AngularFireUploadTask = ref.put(response[0]);
        var uploadPercent = task.percentageChanges();
        task.task.on('state_changed', (snapshot: UploadTaskSnapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (err: Error) => {
          console.log(err.message);
        }, () => {
          task.task.snapshot.ref.getDownloadURL().then((url: UploadTaskSnapshot) => {
            console.log(url);
            this._afs.collection('postMedia/').doc(id).set({
              id: id,
              url: url,
              thumb: url,
              //tag: 'tag'
            });
            this.imageUploading = false;

            editor.image.insert(url, false, null, editor.image.get(), response);
          });
        });

        return false;

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
  imageUploading: boolean;
  adminName: any;
  constructor(
    private _gFunctions: GeneralFunctionsService,
    private _storage: AngularFireStorage,
    private _afs: AngularFirestore,
    private _route: ActivatedRoute,
    private _location: Location,
    private _fb: FormBuilder,
    private _http: Http) {

    this.catRef = this._afs.collection<Category>('categories');
    this.postsRef = this._afs.collection('pages')
  }


  ngOnInit() {
    this._gFunctions.getAdminName().then(()=>{

      console.log(this.adminName)
    });
    this._route.params.subscribe(params => {
      if (params.id == "new") {
        this.title = 'Nova Página';
      } else {
        this.title = 'Editar Página';
        this.id = params.id;
        this.postData = this.postsRef.doc(params.id).ref.get()
          .then(res => {
            const data = res.data();
            this.content = data.content;
            this.postTitle = data.title;
            this.thumbURL = data.thumb;
            this.postDate = data.date;
            this.postCategories = data.categories;
            this.id = data.id;
          });

        this.id = this.postData.id;
        this.content = this.postData.content;
      }
    }, err => {
      console.log(err)
    });
    this.catForm = this._fb.group({
      id: this._fb.array([])
    });
    this.dbCategories = this.catRef.valueChanges();
  }
  saveCategory() {
    const id = this._afs.createId();
    var category = {
      id: id,
      name: this.newCategory,
      slug: this._gFunctions.replaceSpecialChars(this.newCategory),
      active: true
    }
    this.catRef.doc(id).set(category);
    this.newCategory = undefined;
  }
  deleteCategory(category: Category) {
    this._afs.collection("categories").doc(category.id).update({ active: false }).then(() => {
      this._gFunctions.showNotification('success', 'center', "Categoria " + category.name + " Deletada com sucesso!");

      console.log("Document successfully deleted!");

    }).catch(error => {
      this._gFunctions.showNotification('danger', 'center', "Erro ao deletar a categoria " + category.name + ", tente novamente.");
    
      console.error("Error removing document: ", error);
    });
  }
  /* TODO: Consertar a seleção de categorias que ao editar um post 
  /quando selecionar uma categoria e já existiam categorias já definidas todas são desmarcadas exceto a que foi recentemente marcada */
  onCatChange(id: string, isChecked: boolean) {

    var catFormArray = <FormArray>this.catForm.controls.id;

    // console.log(catFormArray.controls[0].setValue(['asd', 'qwe']));


    if (isChecked) {
      //emailFormArray;
      catFormArray.push(new FormControl(id))
      this.postCategories = catFormArray.value;
    } else {
      let index = catFormArray.controls.findIndex(x => x.value == id)

      if (index !== -1) {
        //this.data.splice(index, 1);
      }
      catFormArray.removeAt(index);
      this.postCategories = this.catForm.value.id;

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
      id: id,
      content: this.content,
      title: this.postTitle,
      author: 'this.adminName',
      name: this._gFunctions.replaceSpecialChars(this.postTitle),
      thumb: this.thumbURL ? this.thumbURL : '',
      date: this.postDate,
      modified: Date.now(),
      tags: [1, 4, 2],
      categories: this.postCategories ? this.postCategories : []
    };
    this._afs.collection('pages/').doc(id).set(this.postData).then(res =>{

      this._location.back();
    }, error=>{
      console.log(error);
      const msg = "Erro ao ao salvar a página: "+ error.message;
      this._gFunctions.showNotification('danger', 'center', msg);
    });
  }


  fileChanged($event) {
    this.uploadComplete = false;
    this.uploading = true;
    const id = this.id ? this.id : this._afs.createId();
    this.id = id;
    const path = 'images/pages/' + id + '/' + Date.now() + $event.target.files[0].name;
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
        console.log(url);
        const id = this._afs.createId()
        this._afs.collection('postMedia/').doc(id).set({
          id: id,
          url: url,
          thumb: url,
          tag: 'tag'
        });
        this.uploadComplete = true;
        this.uploading = false;
        console.log(this.thumbURL);
      });
    });

    //this.uploadImage($event.target.files[0], true);

  }
  uploadImage(image?, newPhoto?: boolean) {
    var result = this._http.post('http://localhost:5000/dotti-e8d92/us-central1/uploadImage', image)
    result.subscribe(res => {
      console.log(res)
    })
  }


  async getImages() {
    var imagesRef;
    imagesRef = await new Promise((resolve, reject) => {
      this._afs.collection('postMedia').valueChanges().subscribe(res => {
        resolve(res);
      })
    });


    this.adminName = imagesRef;
    return imagesRef;
  }

}
