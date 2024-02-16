import { Libro } from '../../core/model/libro';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit{

  libros:Libro[] | undefined;
  selectedLibro: Libro | undefined;

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getLibros().subscribe((libros : any) => {
      this.libros = libros;
    },
    (error) => {
      console.log(error);
    });
  }

  show(libro: Libro): void{
    this.selectedLibro = libro;
  }

  hide(): void{
    this.selectedLibro = undefined;
  }

}
