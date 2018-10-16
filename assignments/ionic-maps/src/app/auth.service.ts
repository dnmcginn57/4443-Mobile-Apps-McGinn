import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { appconfig } from './app.config';
import { AngularFirestore} from 'angularfire2/firestore'


@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public platform: Platform
  ){}

  //registers a new user using their email and password
  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
  }

  //logs an existing user in
  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
  }

  //sends new 'user' info to the users collection on 
  //  firebase
  userToCollection(value){

    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users').add({
        first: value.first,
        last: value.last,
        email: value.email
      })
      .then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
    })

  }
}
