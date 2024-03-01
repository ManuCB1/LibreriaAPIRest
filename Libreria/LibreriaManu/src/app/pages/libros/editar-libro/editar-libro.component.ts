import { Tema } from './../../../core/model/tema';
import { Autor } from './../../../core/model/autor';
import { Edicion } from './../../../core/model/edicion';
import { AutoresService } from './../../../services/autores.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from '../../../services/libros.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Formato } from '../../../core/model/formato';
import { TemasService } from '../../../services/temas.service';
import { EdicionesService } from '../../../services/ediciones.service';
import { FormatosService } from '../../../services/formatos.service';
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent implements OnInit {

  FormsLibro: FormGroup;
  submit$: Subject<void> = new Subject<void>();
  autores: Autor[] = [];
  temas: Tema[] = [];
  edicion: Edicion[] = [];
  formato: Formato[] = [];
  libroSeleccionado = this.dialogConfig.data.libro;

  constructor(
    private fb: FormBuilder,
    private readonly librosService: LibrosService,
    private readonly destroy$: AutoDestroyService,
    private readonly autoresService: AutoresService,
    private readonly temasService: TemasService,
    private readonly edicionService: EdicionesService,
    private readonly formatoService: FormatosService,
    private messageService: MessageService,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig
  ) {
    this.FormsLibro = this.fb.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      edicion: ['', Validators.required],
      formato: ['', Validators.required],
      tema: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    this.getData();
    this.subscribeToSubmit();

  }

  getData() {
    this.autoresService.getAutores().subscribe((autores: any) => {
      this.autores = autores;
      this.setAutorSeleccionado();
      this.temasService.getTemas().subscribe((temas: any) => {
        this.temas = temas;
        this.setTemaSeleccionado();
        this.edicionService.getEdiciones().subscribe((ediciones: any) => {
          this.edicion = ediciones;
          this.setEdicionSeleccionado();
          this.formatoService.getFormatos().subscribe((formatos: any) => {
            this.formato = formatos;
            this.setFormatoSeleccionado();
          });
        });
      });
    });
    this.setData();
  }

  setData() {
    this.FormsLibro.controls['nombre'].setValue(this.libroSeleccionado.Nombre);
    this.FormsLibro.controls['precio'].setValue(this.libroSeleccionado.Precio);
    this.FormsLibro.controls['imagen'].setValue(this.libroSeleccionado.Imagen);
  }

  setAutorSeleccionado() {
    const seleccionado = this.autores.find(autor => autor.Nombre === this.libroSeleccionado.Autor);
    if (seleccionado) {
      this.FormsLibro.controls['autor'].setValue(seleccionado);
    }
  }

  setTemaSeleccionado() {
    const seleccionado = this.temas.find(tema => tema.Nombre === this.libroSeleccionado.Tema);
    if (seleccionado) {
      this.FormsLibro.controls['tema'].setValue(seleccionado);
    }
  }

  setEdicionSeleccionado() {
    const seleccionado = this.edicion.find(edicion => edicion.Nombre === this.libroSeleccionado.Edicion);
    if (seleccionado) {
      this.FormsLibro.controls['edicion'].setValue(seleccionado);
    }
  }

  setFormatoSeleccionado() {
    const seleccionado = this.formato.find(formato => formato.Nombre === this.libroSeleccionado.Formato);
    if (seleccionado) {
      this.FormsLibro.controls['formato'].setValue(seleccionado);
    }
  }


  subscribeToSubmit() {
    this.submit$.pipe(
      tap(() => {
        if (this.FormsLibro.invalid) {
          this.FormsLibro.markAllAsTouched();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos' });
        }
      }),
      filter(() => this.FormsLibro.valid),
      exhaustMap(() => this.librosService.putLibro({
        Isbn: this.libroSeleccionado.Isbn,
        Nombre: this.FormsLibro.value.nombre,
        Autor: this.FormsLibro.value.autor.Id,
        Edicion: this.FormsLibro.value.edicion.Id,
        Formato: this.FormsLibro.value.formato.Id,
        Tema: this.FormsLibro.value.tema.Id,
        Precio: this.FormsLibro.value.precio,
        Imagen: this.FormsLibro.value.imagen
      })),
      takeUntil(this.destroy$)
    )
      .subscribe(
        (response: any) => {
          console.log('Libro Editado: ', this.FormsLibro.value);
          this.dialogRef.close(response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tema Guardado Correctamente' });
        });
  }

}
