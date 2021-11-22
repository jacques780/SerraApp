import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArPage } from './ar';
import { HttpModule } from '@angular/http';
import { HaversineService } from "ng2-haversine";
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@NgModule({
  declarations: [
    ArPage,
  ],
  imports: [
    IonicPageModule.forChild(ArPage),
    HttpModule,
  ],
  providers: [
    HaversineService,
    DeviceOrientation,
    CameraPreview,
    AndroidFullScreen,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArPageModule {}
