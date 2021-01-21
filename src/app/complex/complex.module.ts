import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexRoutingModule } from './complex-routing.module';
import { ComplexComponent } from './complex.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ComplexComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComplexRoutingModule
  ]
})
export class ComplexModule { }
