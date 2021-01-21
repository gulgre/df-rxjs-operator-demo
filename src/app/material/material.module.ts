import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [],
  imports: [
    MatTabsModule,
    MatExpansionModule
  ],
  exports: [
    MatTabsModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
