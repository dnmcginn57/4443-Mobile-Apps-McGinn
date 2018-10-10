import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
//import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuthModule} from 'angularfire2/auth';
import { appconfig } from '../../app/app.config';
//import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { combineLatest } from 'rxjs';


 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController,
     public geolocation: Geolocation,
     public firestore: AngularFirestore) {
 
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

    console.log(this.map.getCenter());

    var data = {
      point: {
        Lt: this.map.getCenter().lat(),
        Ln: this.map.getCenter().lng(),       
      },

      time: Date()
    }

    console.log(data);

    this.sendToCollection(data);

  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker)
    })
  }

  sendToCollection(d){
    return new Promise<any>((resolveDefinition, reject) =>{
      this.firestore.collection('locations').add(d)
      .then(
        (res) => {
          resolveDefinition(res)
        },
        err => console.log(err)
      )
    })

  }
 
}