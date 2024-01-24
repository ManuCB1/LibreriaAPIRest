import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { MainPageComponent } from './main-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoresComponent } from './autores/autores.component';
import { TemaComponent } from './tema/tema.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LibrosComponent,
    AutoresComponent,
    TemaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: []
})
export class PagesModule { }
