import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HigherOrderRoutingModule } from './higher-order-routing.module';
import { HigherOrderComponent } from './higher-order.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HigherOrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    HigherOrderRoutingModule
  ]
})
export class HigherOrderModule { }
