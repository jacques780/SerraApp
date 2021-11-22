import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlacesProvider {

  key:any = 'AIzaSyAINTVkf45i_dLESF_CHluQ1zp8ISbofgg';

  constructor(public http: Http) {

  }

  getPlaces(lat, lng, radius) {
   // let path = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&radius='+radius+'&key='+this.key;
   let path = 'assets/data/locations.json';
   return this.http.get(path)
            .map(res => res.json());
  }

  getPlaces2(lat, lng, radius) {
    // let path = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&radius='+radius+'&key='+this.key;
    let path = 'assets/data/locations2.json';
    return this.http.get(path)
             .map(res => res.json());
   }

  getPlace(id) {
    let path =
    'https://maps.googleapis.com/maps/api/place/details/json?placeid='+id+'&key='+this.key;
        return this.http.get(path)
            .map(res => res.json());
  }

}
