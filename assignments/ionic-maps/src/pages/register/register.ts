import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../app/auth.service';

//import { HomePage } from '../home/home';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {}

  ionViewWillLoad(){
    this.registerForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
      first: new FormControl(),
      last: new FormControl()
    });
  }

  //registers user
  tryRegister(value){
    this.authService.doRegister(value) //handles authentication of new users
     .then(res => {
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in now.";
     }, err => {
       this.errorMessage = err.message;
       this.successMessage = "";
     })
     this.authService.userToCollection(value)//calls authService's function to add user details to 'users' collection
     .then( res => {
       let toast = this.toastCtrl.create({
         message: 'User was created successfully',
         duration: 3000
       });
       toast.present();
      }, err => {
        console.log(err)

      })
  }


  goLoginPage(){
    this.navCtrl.pop();
  }

}
