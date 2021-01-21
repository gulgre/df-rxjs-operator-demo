import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [  
    {
      path: 'basic-operations',
      loadChildren: () => import('../basic/basic.module').then(m => m.BasicModule)
    },
    {
      path: 'combined-operations',
      loadChildren: () => import('../combined/combined.module').then(m => m.CombinedModule)
    },
    {
      path: 'higher-order-operations',
      loadChildren: () => import('../higher-order/higher-order.module').then(m => m.HigherOrderModule)

    },
    {
      path: 'complex-operations',
      loadChildren: () => import('../complex/complex.module').then(m => m.ComplexModule)

    },
    {
      path: 'basic-operations',
      loadChildren: () => import('../basic/basic.module').then(m => m.BasicModule)

    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
