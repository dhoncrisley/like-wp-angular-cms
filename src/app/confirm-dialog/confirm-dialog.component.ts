import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  ngOnInit() {
    
  }

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  public confirmMessage:string;

}
