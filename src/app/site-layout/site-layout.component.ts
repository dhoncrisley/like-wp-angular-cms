import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WidgetModalComponent } from '../widget-modal/widget-modal.component';

import { FirebaseError } from 'firebase';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import { AddMenuDialogComponent } from '../add-menu-dialog/add-menu-dialog.component';
import { DragulaService } from 'ng2-dragula';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: "./site-layout.component.html",
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent {
  html: string = 'html template';
  css: string = 'css rules';
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  widgets;
  activeWidgets;
  db: any;
  menus;
  constructor(public dialog: MatDialog,
    private _gFunctions: GeneralFunctionsService,
    private dragulaService: DragulaService) {
    dragulaService.createGroup("SPILL", {
      removeOnSpill: true
    });

    this.widgets = this._gFunctions.getDb().collection('widgets').valueChanges();
    this.menus = this._gFunctions.getDb().collection('navMenu').valueChanges();
    this.db = this._gFunctions.getDb();
    this.activeWidgets = this._gFunctions.getDb().collection('activeWidgets', ref => ref.orderBy('order', 'asc')).valueChanges();
  }
  dropEvent($event) {
    console.log($event)
  }
  openDialog(): void {
    const widgetDialogRef = this.dialog.open(WidgetModalComponent, {
      width: '650px',
      data: {}
    });

    widgetDialogRef.afterClosed().subscribe(result => {
      if (result) {

        if (result.type == 2) {
          const id = this.db.createId();
          this.db.collection('widgets').doc(id).set({ name: result.name, html: result.html, id: id }).then(res => {
            this.db.collection('activeWidgets').doc(id).set({ name: result.name, html: result.html, id: id, order: 0 }).then(res => {
              this._gFunctions.showNotification('success', 'center', 'O widget foi adicionado com sucesso')
            }, (err: FirebaseError) => {
              this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao salvar seu Widget, tente novamente. Erro: ' + err.message)
              console.log(err);
            });
          }, (err: FirebaseError) => {
            this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao salvar seu Widget, tente novamente. Erro: ' + err.message)
            console.log(err);
          });
        } else if (result.type == 1) {
          this.db.collection('activeWidgets').doc(result.id).set({ name: result.name, html: result.html, id: result.id, order: 0 }).then(res => {
            this._gFunctions.showNotification('success', 'center', 'O widget foi adicionado com sucesso')
          }, (err: FirebaseError) => {
            this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao adicionar o seu Widget, tente novamente. Erro: ' + err.message)
            console.log(err);
          });
        }
      }
    });
  }
  removeWidget(widget) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Você tem certeza que quer remover o widget " + widget.name + "?"

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._gFunctions.getDb().collection('activeWidgets').doc(widget.id).delete().then(res => {
          this._gFunctions.showNotification('success', 'center', "O widget " + widget.name + " foi removido com sucesso")
        }, (err: FirebaseError) => {
          this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao remover o widget selecionado, tente novamente. Erro: ' + err.message)
          console.log(err);
        });
      }
      this.dialogRef = null;
    });
  }
  removeNavItem(menu) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Você tem certeza que quer remover o item " + menu.name + " do seu menu?"

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._gFunctions.getDb().collection('navMenu').doc(menu.id).delete().then(res => {
          this._gFunctions.showNotification('success', 'center', "O item " + menu.name + " foi removido com sucesso do seu menu.")
        }, (err: FirebaseError) => {
          this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao remover o item selecionado, tente novamente. Erro: ' + err.message)
          console.log(err);
        });
      }
      this.dialogRef = null;
    });
  }

  addNavItem() {
    const addMenuDialogRef = this.dialog.open(AddMenuDialogComponent, {
      width: '650px',
      data: {}
    });

    addMenuDialogRef.afterClosed().subscribe(result => {
      console.log('after closed ',result);
      if (result) {
        const id = this.db.createId();
        this.db.collection('navMenu').doc(id).set({
          name: result.name,
          type: result.type,
          id: id,
          url: result.url,
          customType: result.customType ? result.customType : ''
        }).then(res => {
          this._gFunctions.showNotification('success', 'center', 'O item do menu foi adicionado com sucesso')

        }, (err: FirebaseError) => {
          this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao salvar seu item do menu, tente novamente. Erro: ' + err.message)
          console.log(err);
        });
      }
    });
  }
  editNavItem(item) {
    const editMenuDialogRef = this.dialog.open(AddMenuDialogComponent, {
      width: '650px',
      data: item
    });

    editMenuDialogRef.afterClosed().subscribe(result => {
      console.log('after closed ',result);
      if (result) {
        //const id = this.db.createId();
        this.db.collection('navMenu').doc(result.id).set({ 
          name: result.name, 
          type: result.type, 
          id: result.id, 
          url: result.url,
          customType: result.customType ? result.customType : '' }).then(res => {
          this._gFunctions.showNotification('success', 'center', 'O item do menu foi alterado com sucesso')

        }, (err: FirebaseError) => {
          this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao salvar alterações, tente novamente. Erro: ' + err.message)
          console.log(err);
        });
      }
    });
  }

}
