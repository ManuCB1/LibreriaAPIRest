import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { BreadCrumComponent } from './bread-crum/bread-crum.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';



@NgModule({
  declarations: [
    BarraNavegacionComponent,
    BreadCrumComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    BreadcrumbModule
  ],
  exports:[BreadCrumComponent]
})
export class SharedModule {
  
 }
