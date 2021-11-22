import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglePage } from './single';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    SinglePage,
  ],
  imports: [
    IonicPageModule.forChild(SinglePage),
  ],
  providers: [
    CallNumber,
    InAppBrowser,
  ]
})
export class SinglePageModule {}
