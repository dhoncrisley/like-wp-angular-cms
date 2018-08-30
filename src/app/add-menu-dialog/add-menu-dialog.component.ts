import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';


@Component({
  selector: 'app-add-menu-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.scss']
})
export class AddMenuDialogComponent implements OnInit {
  menu: any;
  tab;
  posts: any;
  selectedPost;
  constructor(private _gFunctions: GeneralFunctionsService,
    public dialogRef: MatDialogRef<AddMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.tab = data.type
    this.posts = this._gFunctions.getPosts();
    this.menu = this._gFunctions.getDb().collection('menu').valueChanges();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    console.log('onInit data ', this.data)
  }
  typeChanged($event, selectedData?) {
    this.data.type = this.tab
    console.log(this.tab);
    switch (this.tab) {
      case 'post':
        if (selectedData) {
          console.log('selected data', selectedData)
          this.data.url = '/post/'+selectedData.name
          this.data.name = selectedData.title          
        }
        break;
      case 'page':
        break;
      case 'category':
        break;
      case 'tag':
        break;
      case 'custom':
        break;

    }

  }

}
