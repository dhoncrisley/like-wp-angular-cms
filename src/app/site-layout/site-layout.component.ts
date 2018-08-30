import { Component, OnInit, TemplateRef, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WidgetModalComponent } from '../widget-modal/widget-modal.component';

import { FirebaseError } from 'firebase';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import { AddMenuDialogComponent } from '../add-menu-dialog/add-menu-dialog.component';
import { DragulaService } from 'ng2-dragula';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean, public filename: string, public level: number, public type: any) { }
}

const TREE_DATA = JSON.stringify({
  Applications: {
    Calendar: 'app',
    Chrome: 'app',
    Webstorm: 'app'
  },
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    material2: {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  },
  Downloads: {
    October: 'pdf',
    November: 'pdf',
    Tutorial: 'html'
  },
  Pictures: {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir'
    },
    Sun: 'png',
    Woods: 'jpg'
  }
});
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}



@Component({
  selector: 'app-site-layout',
  templateUrl: "./site-layout.component.html",
  styleUrls: ['./site-layout.component.scss'],
  providers: [FileDatabase]
})
export class SiteLayoutComponent {
  html: string = 'html template';
  css: string = 'css rules';
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  widgets;
  activeWidgets;
  db: any;
  menus;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;

  constructor(database: FileDatabase,
    private dialog: MatDialog,
    private _gFunctions: GeneralFunctionsService,
    private dragulaService: DragulaService) {


    this.widgets = this._gFunctions.getDb().collection('widgets').valueChanges();
    this.menus = this._gFunctions.getDb().collection('navMenu').valueChanges();
    this.db = this._gFunctions.getDb();
    this.activeWidgets = this._gFunctions.getDb().collection('activeWidgets', ref => ref.orderBy('order', 'asc')).valueChanges();
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => this.dataSource.data = data);
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type);
  }

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

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
      console.log('after closed ', result);
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
      console.log('after closed ', result);
      if (result) {
        //const id = this.db.createId();
        this.db.collection('navMenu').doc(result.id).set({
          name: result.name,
          type: result.type,
          id: result.id,
          url: result.url,
          customType: result.customType ? result.customType : ''
        }).then(res => {
          this._gFunctions.showNotification('success', 'center', 'O item do menu foi alterado com sucesso')

        }, (err: FirebaseError) => {
          this._gFunctions.showNotification('danger', 'center', 'Ocorreu um erro ao salvar alterações, tente novamente. Erro: ' + err.message)
          console.log(err);
        });
      }
    });
  }

}

/* @Component({
  selector: 'tree-nested-overview-example',
  templateUrl: 'tree-nested-overview-example.html',
  styleUrls: ['tree-nested-overview-example.css'],
  providers: [FileDatabase]
})
export class TreeNestedOverviewExample {
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  constructor(database: FileDatabase) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;
} */
