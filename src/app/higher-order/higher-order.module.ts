import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HigherOrderRoutingModule } from './higher-order-routing.module';
import { HigherOrderComponent } from './higher-order.component';


@NgModule({
  declarations: [HigherOrderComponent],
  imports: [
    CommonModule,
    HigherOrderRoutingModule
  ]
})
export class HigherOrderModule { }
