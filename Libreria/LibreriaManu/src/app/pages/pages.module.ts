import { RouterModule } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { MainPageComponent } from './main-page.component';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoresComponent } from './autores/autores.component';
import { TemaComponent } from './tema/tema.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { CrearLibroComponent } from './libros/crear-libro/crear-libro.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    MainPageComponent,
    LibrosComponent,
    AutoresComponent,
    TemaComponent,
    CrearLibroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputNumberModule
  ],
  exports: []
})
export class PagesModule { 
  

}
