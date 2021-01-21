import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HigherOrderComponent } from './higher-order.component';

const routes: Routes = [
  {
    path: '',
    component: HigherOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HigherOrderRoutingModule { }
