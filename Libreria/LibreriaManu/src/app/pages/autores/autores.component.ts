import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AutoresService } from '../../services/autores.service';
import { Autor } from '../../core/model/autor';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearAutorComponent } from './crear-autor/crear-autor.component';
import { NzModalService } from 'ng-zorro-antd/modal';

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

  openDialog(): void {
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
      nzOnOk: () => {
        this.autoresService.deleteAutor(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            this.getData();
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Autor Eliminado Correctamente' });
          });
      }
    });
  }

}
