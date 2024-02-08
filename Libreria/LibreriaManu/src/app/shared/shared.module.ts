import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { BreadCrumComponent } from './bread-crum/bread-crum.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DockModule } from 'primeng/dock';



@NgModule({
  declarations: [
    BarraNavegacionComponent,
    BreadCrumComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    BreadcrumbModule,
    DockModule
  ],
  exports:[BreadCrumComponent, BarraNavegacionComponent]
})
export class SharedModule {
  
 }
