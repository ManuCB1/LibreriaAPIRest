import { Libro } from '../../core/model/libro';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit{

  libros:Libro[] = [];

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getLibros().subscribe((libros:any) => {
      this.libros = libros;
      // console.log(libros);
    });
  }

}
