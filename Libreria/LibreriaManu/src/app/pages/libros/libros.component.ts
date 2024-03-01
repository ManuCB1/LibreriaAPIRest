import { DialogModule } from 'primeng/dialog';
import { subscribe } from 'diagnostics_channel';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounce, delay, pipe, take, takeUntil, exhaustMap, filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { Libro } from '../../core/model/libro';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit, Input } from '@angular/core';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { EditarLibroComponent } from './editar-libro/editar-libro.component';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {

  librosReales: Libro[] | undefined;
  selectedLibro: Libro | undefined;
  libroBuscado = new FormControl();
  librosTemp: Libro[] | undefined;
  librosMostrados: Libro[] | undefined;

  constructor(
    private readonly librosService: LibrosService,
    private readonly destroy$: AutoDestroyService,
    private readonly modalService: NzModalService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
    this.subscribeToSearch();
  }

  getData(): void {
    this.librosService.getLibros()
      .pipe(takeUntil(this.destroy$))
      .subscribe((libros: any) => {
        this.librosReales = libros;
        this.librosMostrados = libros;
      });
  }

  subscribeToSearch() {
    this.libroBuscado.valueChanges
      .pipe(
        // filter((texto: string) => texto.length === 13 || texto.length < 13),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(async (isbn) => {
          if (isbn.length === 13) {
            return this.buscarPorISBN(isbn);
          } else {
            return this.librosMostrados = this.librosReales;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(resultado => {
        // console.log('Resultado: ',resultado);
      });
  }

  buscarPorISBN(isbn: string) {
    const libroEncontrado = this.librosReales?.filter((libro: Libro) => libro.Isbn == isbn);
    console.log(libroEncontrado?.length);
    if (libroEncontrado?.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Libro no Encontrado' });
      this.librosMostrados = this.librosReales;
      return;
    }
    this.librosMostrados = libroEncontrado;

  }

  show(libro: Libro): void {
    this.selectedLibro = libro;
  }

  hide(): void {
    this.selectedLibro = undefined;
  }

  updateLibro(libro: any): void {
    this.dialogRef = this.dialogService.open(EditarLibroComponent, {
      header: 'Editar Libro',
      width: '80%',
      height: '80%',
      contentStyle: { 'height': '150px' },
      data: { libro: libro }
    });
    this.dialogRef.onClose.subscribe((response: any) => {
      if (response) {
        this.getData();
      }
    });
  }

  deleteLibro(Isbn: string) {
    this.modalService.confirm({
      nzTitle: '¿Estás seguro de eliminar este libro?',
      nzContent: 'El libro será eliminado de forma permanente',
      nzOkText: 'Sí',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzOnOk: () => {
        this.librosService.deleteLibro(Isbn)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.getData();
            this.messageService.add({ severity: 'success', summary: 'Libro eliminado', detail: 'El libro ha sido eliminado correctamente' });
          });
      }
    });
  }

}
