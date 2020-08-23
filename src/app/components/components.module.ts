import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DarkModeComponent} from './dark-mode/dark-mode.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [DarkModeComponent],
  exports: [
    DarkModeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
