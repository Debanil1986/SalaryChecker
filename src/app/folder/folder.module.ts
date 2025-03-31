import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { SalarycardComponent } from './salarycard/salarycard.component';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [
    FolderPage,
    SalarycardComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FolderPageModule {}
