import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AutoresService } from '../../services/autores.service';
import { Autor } from '../../core/model/autor';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { catchError, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearAutorComponent } from './crear-autor/crear-autor.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditarAutorComponent } from './editar-autor/editar-autor.component';
import { error } from 'node:console';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit {

  autores: Autor[] | undefined;

  constructor(
    private readonly autoresService: AutoresService,
    private readonly destroy$: AutoDestroyService,
    private readonly dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly modalService: NzModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  newDialog(): void {
    this.dialogRef = this.dialogService.open(CrearAutorComponent, {
      header: 'Nuevo Autor',
      width: '30%',
      contentStyle: { 'height': '150px' }
    });
    this.dialogRef.onClose.subscribe((response: any) => {
      if (response) {
        this.getData();
      }
    });
  }

  updateDialog(id: number): void {
    this.dialogRef = this.dialogService.open(EditarAutorComponent, {
      header: 'Editar Autor',
      width: '30%',
      contentStyle: { 'height': '150px' },
      data: { idAutor: id }
    });
    this.dialogRef.onClose.subscribe((response: any) => {
      if (response) {
        this.getData();
      }
    });
  }

  getData() {
    this.autoresService.getAutores()
      .pipe(takeUntil(this.destroy$))
      .subscribe((autores: any) => {
        this.autores = autores;
      });
  }

  deleteAutor(id: number): void {
    this.modalService.confirm({
      nzTitle: '¿Está seguro/a de eliminar el autor?',
      nzContent: 'El autor será eliminado',
      nzOkText: 'Sí',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzOnOk: () => {
        this.autoresService.deleteAutor(id)
          .pipe(
            // catchError((error) => {
            //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar el autor porque está en algún Libro' });
            //   return error;
            // }),
            takeUntil(this.destroy$))
          .subscribe((response: any) => {
            if (response.Error == null){
              this.getData();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Autor Eliminado Correctamente' });
            }else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar el autor porque está en algún Libro' });
            }
          }
          // (error: any) => {
          //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar el autor porque está en algún Libro' });
          // }
          );
      }
    });
  }

}
