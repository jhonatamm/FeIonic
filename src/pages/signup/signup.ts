import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  formGroup: FormGroup
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public FormBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController

    ) {

      this.formGroup = this.FormBuilder.group({
        nome:['Joaozim',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
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

  ionViewDidLoad(){
    this.estadoService.findALL()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCities();
    },error =>{});
  }
  updateCities(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findALL(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => {});
  }

  signupUser(){
    console.log(this.formGroup.value);
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response => { this.showInsertOk();},
    error =>{}
    
    )
    
  }
  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
        text:'ok',
        handler: () => {
          this.navCtrl.pop();
          }
        }
       ]     
      });
      alert.present();
  }

}
