import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CombinedRoutingModule } from './combined-routing.module';
import { CombinedComponent } from './combined.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CombinedComponent],
  imports: [
    CommonModule,
    SharedModule,
    CombinedRoutingModule
  ]
})
export class CombinedModule { }
