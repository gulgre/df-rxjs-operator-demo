import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DemoContentComponent } from './components/demo-content/demo-content.component';



@NgModule({
  declarations: [DemoContentComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    DemoContentComponent
  ]
})
export class SharedModule { }
