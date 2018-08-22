import { Component, OnInit, Inject, Input, Pipe, PipeTransform } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DomSanitizer } from '@angular/platform-browser';
import { MonacoFile } from 'ngx-monaco';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';

@Component({
  selector: 'app-widget-modal',
  templateUrl: './widget-modal.component.html',
  styleUrls: ['./widget-modal.component.scss']
})
export class WidgetModalComponent {
  tab: number = 0;
  html;
  css;
  selected = {name: '', id:'', html: '', type: 0};
  widgets: any;
  file: MonacoFile = {
		uri: 'widget.html',
		language: 'html',
    content: `<h4>Template html</h4>
    <h6>Os templates devem ter os estilos inline</h6>`
	};

	onFileChange(file: MonacoFile) {
    // Handle file change
    this.data.html = file.content;
	}
  setTab(num: number) {
    this.tab = num;
  }
  returnData(){
    if(this.tab == 1){
      this.selected.type = 1;
      return this.selected;
    } else if( this.tab == 2){

      this.data.type = 2;
      return this.data;
    }
  }
  onReady(editor: monaco.editor.IEditor) {
		//console.log(editor);
		// Bootstrap(editor);
	}


  /*   isSelected(num: number) {
      return this.tab === num;
    } */
  constructor(private _gFunctions: GeneralFunctionsService,
    public dialogRef: MatDialogRef<WidgetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.widgets = this._gFunctions.getDb().collection('widgets').valueChanges();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onEditorInitialized(){
    console.log('editor initialized')
  }

}

