import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoresService } from '../../../services/autores.service';
import { TemasService } from '../../../services/temas.service';
import { Autor } from '../../../core/model/autor';
import { Tema } from '../../../core/model/tema';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrl: './crear-libro.component.css'
})
export class CrearLibroComponent implements OnInit{

  FormsLibro: FormGroup;
  autores: Autor[] = [];
  temas: Tema[] = [];

  constructor(private fb: FormBuilder, private autoresService: AutoresService, private temasService: TemasService) {
    this.FormsLibro = this.fb.group({});
    this.autores = [
      // TODO: Agregar autores
    ];
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
    
    });
  });
  }

  guardarLibro() {
    if (this.FormsLibro.invalid) {
      // Mostrar mensaje de error
      // No se muestra porque el botón de guardar no está habilitado si el formulario es inválido
      Swal.fire('Error', 'Faltan campos por llenar', 'error');
      return;
    }
    console.log(this.FormsLibro.value);
    Swal.fire('Éxito', 'Libro Guardado Correctamente', 'success');
  }

}

