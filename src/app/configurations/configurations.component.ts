import { Component, OnInit } from '@angular/core';
import { FirebaseFirestore } from 'angularfire2';
import { FirebaseError } from 'firebase';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  editing = false;
  model; /* = {blogname: '', siteurl: '', home: '', blogdescription: ''}; */
  loading: boolean;
  constructor(private _gFunctions: GeneralFunctionsService) { }

  ngOnInit() {
    this._gFunctions.getDb().collection('configurations')
      .doc('general')
      .valueChanges()
      .subscribe(res => this.model = res);
    console.log(this.model);
  }
  saveConfig() {
    this.loading = true;
    this._gFunctions.getDb().collection('configurations')
    .doc('general').update(this.model).then(res =>{
      console.log(res);
      this.editing = false;
      this.loading = false;
      this._gFunctions.showNotification('success', 'center', 'Configurações salvas com sucesso!')
      }, (error:FirebaseError) =>{
        this._gFunctions.showNotification('danger', 'center', 'Algo deu errado: '+ error.message)
      })
  }
  editConfig() {
    this.editing = true;
  }
  cancelConfig() {
    this.editing = false;
  }

}
