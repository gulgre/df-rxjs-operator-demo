import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,    
    SharedModule,
    BasicRoutingModule
  ]
})
export class BasicModule { }
