import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlacesProvider } from '../../providers/places/places';
import { LoadingController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {

  id: any = 'ChIJn0qNKPmKTkcRpBtpYHMB3GA';
  place:any;
  loader:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placesPro: PlacesProvider,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    private iab: InAppBrowser,
  ) {
    this.id = navParams.get('id');
    console.log('id == ', this.id);
  }

  ionViewDidLoad() {
    this.showLoading('Loading place details...');
    this.placesPro.getPlace(this.id).subscribe(data => {
      this.place = data.result;
      this.hideLoading();
    });
  }

  goto(page) {
    this.navCtrl.setRoot(page)
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

  call(number) {
    this.callNumber.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  web(website) {
    const browser = this.iab.create(website);
  }

}
