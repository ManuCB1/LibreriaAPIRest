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
import { EditarAutorComponent } from './autores/editar-autor/editar-autor.component';
import { CrearTemaComponent } from './tema/crear-tema/crear-tema.component';
import { EditarTemaComponent } from './tema/editar-tema/editar-tema.component';
import { EditarLibroComponent } from './libros/editar-libro/editar-libro.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { EdicionComponent } from './edicion/edicion.component';
import { FormatoComponent } from './formato/formato.component';
import { CrearEdicionComponent } from './edicion/crear-edicion/crear-edicion.component';
import { EditarEdicionComponent } from './edicion/editar-edicion/editar-edicion.component';
import { CrearFormatoComponent } from './formato/crear-formato/crear-formato.component';
import { EditarFormatoComponent } from './formato/editar-formato/editar-formato.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LibrosComponent,
    AutoresComponent,
    TemaComponent,
    CrearLibroComponent,
    CrearAutorComponent,
    EditarAutorComponent,
    CrearTemaComponent,
    EditarTemaComponent,
    EditarLibroComponent,
    EdicionComponent,
    FormatoComponent,
    CrearEdicionComponent,
    EditarEdicionComponent,
    CrearFormatoComponent,
    EditarFormatoComponent
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
    NzButtonModule,
    NzInputModule
  ],
  providers: [AutoDestroyService, MessageService, DialogService, DynamicDialogRef, NzModalService],
  exports: []
})
export class PagesModule {


}
