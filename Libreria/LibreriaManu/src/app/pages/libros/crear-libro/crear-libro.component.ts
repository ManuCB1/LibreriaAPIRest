import { LibrosService } from './../../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoresService } from '../../../services/autores.service';
import { TemasService } from '../../../services/temas.service';
import { Autor } from '../../../core/model/autor';
import { Tema } from '../../../core/model/tema';
import { Formato } from '../../../core/model/formato';
import { Edicion } from '../../../core/model/edicion';
import { EdicionesService } from '../../../services/ediciones.service';
import { FormatosService } from '../../../services/formatos.service';
import { exhaustMap, filter, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrl: './crear-libro.component.css'
})
export class CrearLibroComponent implements OnInit {

  FormsLibro: FormGroup;
  autores: Autor[] = [];
  temas: Tema[] = [];
  edicion: Edicion[] = [];
  formato: Formato[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly autoresService: AutoresService,
    private readonly temasService: TemasService,
    private readonly edicionService: EdicionesService,
    private readonly formatoService: FormatosService,
    private readonly librosService: LibrosService,
    private readonly destroy$: AutoDestroyService,
    private messageService: MessageService) {
    this.FormsLibro = this.fb.group({});
  }

  ngOnInit(): void {
    this.FormsLibro = this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      edicion: ['', Validators.required],
      formato: ['', Validators.required],
      tema: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
    });
    this.getData();
  }

  getData() {
    this.autoresService.getAutores().subscribe((autores: any) => {
      this.autores = autores;
      this.temasService.getTemas().subscribe((temas: any) => {
        this.temas = temas;
        this.edicionService.getEdiciones().subscribe((ediciones: any) => {
          this.edicion = ediciones;
          this.formatoService.getFormatos().subscribe((formatos: any) => {
            this.formato = formatos;
          });
        });
      });
    });
  }

  onSubmit() {
    if (this.FormsLibro.invalid) {
      this.FormsLibro.markAllAsTouched();
      // Swal.fire('Error', 'Faltan campos por llenar', 'error');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos' });
      // console.log('Faltan campos por llenar');
      return;
    }
    this.guardarLibro();
  }

  guardarLibro() {
    const { isbn, nombre, autor, edicion, formato, tema, precio, cantidad, imagen } = this.FormsLibro.value;
    let libro: any = {
      Isbn: isbn,
      Nombre: nombre,
      Autor: autor.Id,
      Edicion: edicion.Id,
      Formato: formato.Id,
      Tema: tema.Id,
      Precio: precio,
      Cantidad: cantidad,
      Imagen: imagen
    }
    this.librosService.postLibro(libro)
      .pipe(
        filter(() => this.FormsLibro.valid),
        // exhaustMap(() => this.librosService.getLibros()),
        takeUntil(this.destroy$)
      )
      .subscribe((libro: any) => {
        console.log(libro);
      }, (error) => {
        console.log(error);
        // Swal.fire('Error', 'Error al guardar Libro: '+ error, 'error');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar Libro: ' + error });
      });

    // Swal.fire('Éxito', 'Libro Guardado Correctamente', 'success');
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro Guardado Correctamente' });
    this.FormsLibro.reset();
  }

}
