import { RouterModule } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { MainPageComponent } from './main-page.component';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoresComponent } from './autores/autores.component';
import { TemaComponent } from './tema/tema.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainPageComponent,
    LibrosComponent,
    AutoresComponent,
    TemaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  exports: []
})
export class PagesModule { 
  

}
