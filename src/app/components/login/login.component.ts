import { Component, OnInit } from '@angular/core';
import { User } from '../../../../node_modules/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '../../../../node_modules/@angular/router';
import { GeneralFunctionsService } from '../../general-functions.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AngularFireAuth]
})
export class LoginComponent implements OnInit {
  
  user = { email: null, password: null };
  constructor(private _gFunctions: GeneralFunctionsService,private _router: Router,public _afAuth: AngularFireAuth) {
    //this.user.email = 'usheuh';
  }

  ngOnInit() {
    
    this._afAuth.authState.subscribe(res => {
      if(res){

        this._router.navigateByUrl('admin');
      }
    }, error =>{
      console.log(error)
    })
    
  }
  login() {
    try{

      const auth = this._afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res => console.log(res));

    } catch (error){
      console.log(error);
      switch(error.code){
        case 'auth/argument-error': console.log('preencha os dados'); break;
        case 'auth/user-not-found' : console.log('Usuário não encontrado'); break;
        case 'auth/wrong-password' : console.log('Senha incorreta'); break;
        case 'auth/user-disabled' : console.log('Usuário bloqueado'); break;
        case 'auth/user-token-expired' : console.log('Token expirado'); break;
        case 'auth/too-many-requests' : console.log('Você atingiu a quantidade máxima de requisições'); break;
        case 'auth/network-request-failed' : console.log('Tempo limite excedido, verifique sua conexão'); break;
        case 'auth/invalid-user-token' : console.log('Seu token não é mais válido, entre novamente'); break;
        case 'auth/app-deleted' : console.log('Esse app foi excluído'); break;
        case 'auth/app-not-authorized' : console.log('Esse app está autorizado'); break;
        case 'auth/invalid-api-key' : console.log('Erro, Chave de API inválida'); break;
      }
    }




  }

}
