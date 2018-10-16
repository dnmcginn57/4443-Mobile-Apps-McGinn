import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AuthService } from '../../app/auth.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {}

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  //uses firebase authentication
  //  to log existing users in
  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      console.log(res);
      this.navCtrl.push(HomePage);//shows the map on successful log in
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

 

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
