import { Component, Injectable, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { PlacesProvider } from '../../providers/places/places';
import { LoadingController } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@IonicPage()
@Component({
  selector: 'page-ar',
  templateUrl: 'ar.html',
})
export class ArPage {

  places: any = [];
  directions: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO', 'N'];
  direction: any = '';
  mot: any;
  radius: any = 500;
  loader: any;

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private har: HaversineService,
    private orientation: DeviceOrientation,
    public zone: NgZone,
    private cameraPreview: CameraPreview,
    private placesPro: PlacesProvider,
    public loadingCtrl: LoadingController,
    private androidFullScreen: AndroidFullScreen,
  ) {

  }

  ionViewDidLoad() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch((error: any) => console.log(error));
    this.showLoading('A ler dados...');
    // this.startCamera();
    this.getOrientation();
    this.locate();
  }

  startCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      toBack: true,
    };

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }

  hideCamera() {
    this.cameraPreview.stopCamera();
  }

  getOrientation() {
    const options = { frequency: 100 };
    // Watch the device compass heading change
    this.orientation.watchHeading(options).subscribe(
      (or: DeviceOrientationCompassHeading) => {
        let data: any = or.trueHeading / 45;
        this.direction = this.directions[Math.abs(parseInt(data) + 1)];
        this.mot = or.trueHeading;
      }
    );
  }

  locate() {
    this.places = [];
    const options = {
      timeout: 5000,
      enableHighAccuracy: true,
    }
    this.geolocation.getCurrentPosition(options).then((resp) => {
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      this.placesPro.getPlaces(lat, lng, this.radius).subscribe(data => {
        data.results.forEach(d => {
          if (d.types[0] != 'locality') {
            this.places.push({
              distance: this.getDistance(lat, lng, d.geometry.location.lat, d.geometry.location.lng),
              bearing: this.getBearing(lat, lng, d.geometry.location.lat, d.geometry.location.lng),
              place: d
            })
          }
        })
        this.hideLoading();
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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

  getDistance(lat1, lng1, lat2, lng2) {

    let myloc: GeoCoord = {
      latitude: lat1,
      longitude: lng1
    };

    let placeloc: GeoCoord = {
      latitude: lat2,
      longitude: lng2
    };

    //let meters = this.har.getDistanceInMeters(myloc, placeloc);
    let kilometers = this.har.getDistanceInKilometers(myloc, placeloc);
    //let miles = this.har.getDistanceInMiles(myloc, placeloc);

    //return meters;
    return kilometers;

  }


  getBearing(lat1, lng1, lat2, lng2) {
    let dLat = (lat1 - lat2) * Math.PI / 180;
    let dLon = (lng1 - lng2) * Math.PI / 180;
    let lat1f = lat2 * Math.PI / 180;
    let lat2f = lat1 * Math.PI / 180;
    let y = Math.sin(dLon) * Math.cos(lat2f);
    let x = Math.cos(lat1f) * Math.sin(lat2f) - Math.sin(lat1f) * Math.cos(lat2f) * Math.cos(dLon);
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = bearing + 180;
    return bearing;
  }


  show(b) {
    if (Math.abs(b - this.mot) < 20) {
      return true;
    } else {
      return false;
    }
  }


  info(id) {
    this.navCtrl.push('SinglePage', {
      id: id
    })
  }

  goto(page) {
    // this.hideCamera();
    this.navCtrl.setRoot(page)
  }


}
