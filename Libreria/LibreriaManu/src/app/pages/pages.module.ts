import { ToastModule } from 'primeng/toast';
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
import { AutoDestroyService } from '../services/utils/auto-destroy.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CrearAutorComponent } from './autores/crear-autor/crear-autor.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    MainPageComponent,
    LibrosComponent,
    AutoresComponent,
    TemaComponent,
    CrearLibroComponent,
    CrearAutorComponent
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
    InputNumberModule,
    ToastModule,
    DialogModule,
    NzModalModule,
    NzIconModule,
    NzButtonModule
  ],
  providers: [AutoDestroyService, MessageService, DialogService, DynamicDialogRef, NzModalService],
  exports: []
})
export class PagesModule {


}
