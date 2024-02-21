import { pipe, take, takeUntil } from 'rxjs';
import { Libro } from '../../core/model/libro';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {

  libros: Libro[] | undefined;
  selectedLibro: Libro | undefined;

  constructor(
    private readonly librosService: LibrosService,
    private readonly destroy$: AutoDestroyService) { }

  ngOnInit(): void {
    this.librosService.getLibros()
      .pipe(takeUntil(this.destroy$))
      .subscribe((libros: any) => {
        this.libros = libros;
      });
  }

  show(libro: Libro): void {
    this.selectedLibro = libro;
  }

  hide(): void {
    this.selectedLibro = undefined;
  }

}
