import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { Diagnostic } from '@ionic-native/diagnostic';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
  ],
  providers: [
    Diagnostic
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListPageModule {}
