import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public FormBuilder: FormBuilder
    ) {

      this.formGroup = this.FormBuilder.group({
        nome:['Joao',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email:['teste@teste.com',[Validators.required,Validators.email]],
        tipo:['',[Validators.required]],
        cpfOuCnpj:['012345678909',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
        senha:['123',[Validators.required]],
        logradouro:['Rua Rosal',[Validators.required]],
        numero:['36',[Validators.required]],
        complemento:['casa',[]],
        bairro:['Bom Jesus',[]],
        cep:['28160000',[Validators.required]],
        telefone1:['977722222',[Validators.required]],
        telefone2:['',[]],
        telefone3:['',[]],
        estadoId:[null,[Validators.required]],
        cidadeId:[null,[Validators.required]]
      });
  }

  signupUser(){
    console.log("Enviou o form");
  }


}
