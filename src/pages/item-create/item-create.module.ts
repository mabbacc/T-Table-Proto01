import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemCreatePage } from './item-create';

import { TagInputModule } from 'ngx-chips';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCreatePage),
    TranslateModule.forChild(),
    TagInputModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ItemCreatePage
  ]
})
export class ItemCreatePageModule { }
