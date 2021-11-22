import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacesProvider } from '../../providers/places/places';
import { LoadingController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import {Observable} from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  radius:any = 500;
  places:any;
  loader:any;
  location:any = false;
  locationObserver:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private placesPro: PlacesProvider,
    public loadingCtrl: LoadingController,
    private diagnostic: Diagnostic,
    public zone: NgZone,
  ) {

    Observable.interval(4000).subscribe(x => {

      this.diagnostic.isLocationEnabled()
        .then((state) => {
          this.location = state;
        }).catch(e => console.error(e));

      if(this.location == true) {

      } else {
        // this.showLoading('A ler dados...');
        this.locate();
      }

    });

  }

  ionViewDidLoad() {
    this.showLoading('A receber as suas coordenadas...');
  }

  init() {
    if(this.location == true) {

    }
  }

  locate() {
    const options = {
      timeout: 5000,
      enableHighAccuracy: true,
    }

   this.geolocation.getCurrentPosition(options)
    .then(resp => {
        this.location = true;
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        this.getPlaces(lat, lng);
      }).catch(err => {
        this.location = false;
      });
  }

  getPlaces(lat, lng) {
    this.places = null;
    this.placesPro.getPlaces(lat,lng, this.radius).subscribe(data => {
      this.places = data.results;
      this.hideLoading();
    });
  }

  goto(page) {
    this.navCtrl.setRoot(page)
  }

  single(id) {
    this.navCtrl.push('SinglePage', {
      id: id
    })
  }

  showLoading(message) {
    this.loader = this.loadingCtrl.create({
      content: message,
      duration: 10000
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

}
