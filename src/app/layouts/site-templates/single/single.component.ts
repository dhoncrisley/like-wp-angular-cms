import { Component, OnInit } from '@angular/core';
import { GeneralFunctionsService } from '../../../general-functions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  postData;

  constructor(private _gFunctions: GeneralFunctionsService, private _route: ActivatedRoute) {
    this.getPostData(_gFunctions);
  }

  private getPostData(_gFunctions: GeneralFunctionsService) {
    this._route.params.subscribe(cb => {
      _gFunctions.getDb().collection('posts').ref.where('post_name', '==', cb.id).get().then(res => {
        //const data 
        res.forEach(cb => {
          this.postData = cb.data();

        });
      });

    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
