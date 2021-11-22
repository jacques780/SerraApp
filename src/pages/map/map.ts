import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacesProvider } from '../../providers/places/places';
import { LoadingController } from 'ionic-angular';
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude:any;
  longitude:any;
  radius:any = 500;
  loader:any;
  id:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private placesPro: PlacesProvider,
    public loadingCtrl: LoadingController,
  ) {

  }

  ionViewDidLoad() {

    this.showLoading('Aguarde...');
    const options = {
      timeout: 5000,
      enableHighAccuracy: true,
    }

   this.geolocation.getCurrentPosition(options)
    .then(resp => {
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      let latlng = new google.maps.LatLng(lat, lng);
      this.loadMap(latlng);
      this.addMarker(lat, lng, 'assets/imgs/centro.png', null, null);
      this.getPlaces(lat, lng);
      });
  }

  getPlaces(lat, lng) {
    this.placesPro.getPlaces(lat,lng, this.radius).subscribe(data => {
      data.results.forEach(d => {
       // console.log(d.types[0])
       // if(d.types[0] != 'locality') {
        this.addMarker(d.lat, d.lng, 'assets/imgs/map-icons/marker.png', d.name, null);

         // this.addMarker(d.geometry.location.lat, d.geometry.location.lng, 'assets/imgs/map-icons/'+d.types[0]+'.png', d.name, d.place_id);
      //  }
    })
    this.hideLoading();
    });
  }

  loadMap(coords) {
    let mapOptions = {
      center: coords,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false,
      scrollwheel: false,
      navigationControl: false,
      draggable: true,
      // style https://snazzymaps.com
      styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"},{"color":"#efebe2"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#efebe2"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#efebe2"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"color":"#efebe2"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"color":"#efebe2"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"color":"#dfdcd5"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"color":"#dfdcd5"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#bad294"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"color":"#efebe2"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"color":"#efebe2"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"color":"#efebe2"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#fbfbfb"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#a5d7e0"}]}]
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(lat, lng, markerIcon, markerLabel, id) {
      let icon = {
        url: markerIcon,
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0),
        labelOrigin:  new google.maps.Point(35,80),
    };
      let MlatLng = new google.maps.LatLng(lat, lng)
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: MlatLng,
        icon: icon,
        id: id,
        // label: {
        //   text: markerLabel,
        //   color: "#222222",
        //   fontSize: "14px",
        // },
      });
      marker.addListener('click', function() {
        //  this.id = id;
        //  this.gotoSingle();
        });
      marker.setMap(this.map);
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

  goto(page) {
    this.navCtrl.setRoot(page)
  }

  gotoSingle() {
    this.navCtrl.push('SinglePage', {
      id: this.id
    })
  }

}
