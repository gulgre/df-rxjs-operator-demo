import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CombinedRoutingModule } from './combined-routing.module';
import { CombinedComponent } from './combined.component';


@NgModule({
  declarations: [CombinedComponent],
  imports: [
    CommonModule,
    CombinedRoutingModule
  ]
})
export class CombinedModule { }
