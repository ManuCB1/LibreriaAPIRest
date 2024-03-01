import { response } from 'express';
import { Component, OnInit } from '@angular/core';
import { Formato } from '../../core/model/formato';
import { FormatosService } from '../../services/formatos.service';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CrearFormatoComponent } from './crear-formato/crear-formato.component';
import { subscribe } from 'diagnostics_channel';
import { EditarFormatoComponent } from './editar-formato/editar-formato.component';

@Component({
  selector: 'app-formato',
  templateUrl: './formato.component.html',
  styleUrl: './formato.component.css'
})
export class FormatoComponent implements OnInit {

  formatos: Formato[] = [];

  constructor(private readonly formatoService: FormatosService,
    private readonly destroy$: AutoDestroyService,
    private readonly dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly modalService: NzModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.formatoService.getFormatos()
      .subscribe((response: any) => {
        this.formatos = response;
      });
  }

  newDialog(): void {
    this.dialogRef = this.dialogService.open(CrearFormatoComponent, {
      header: 'Nuevo Formato',
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
    this.dialogRef = this.dialogService.open(EditarFormatoComponent, {
      header: 'Editar Formato',
      width: '30%',
      contentStyle: { 'height': '150px' },
      data: { Id: id }
    });
    this.dialogRef.onClose.subscribe((response: any) => {
        if (response) {
          this.getData();
        }
      });
  }

  deleteFormato(id: number): void {
    this.modalService.confirm({
      nzTitle: '¿Está seguro de eliminar el formato?',
      nzContent: 'Esta acción no se puede deshacer',
      nzOkText: 'Sí',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzOnOk: () => {
        this.formatoService.deleteFormato(id)
          .subscribe((response: any) => {
            if (response.Error == null){
              this.getData();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Formato Eliminada Correctamente' });
            }else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar el Formato porque está en algún Libro' });
            }
          });
      }
    });
  }
}
