import { response } from 'express';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { TemasService } from '../../services/temas.service';
import { Tema } from '../../core/model/tema';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditarTemaComponent } from './editar-tema/editar-tema.component';
import { CrearTemaComponent } from './crear-tema/crear-tema.component';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css'
})
export class TemaComponent {

  temas: Tema[] = [];

  constructor(private temasService: TemasService,
    private readonly destroy$: AutoDestroyService,
    private dialogRef: DynamicDialogRef,
    private readonly dialogService: DialogService,
    private messageService: MessageService,
    private readonly modalService: NzModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.temasService.getTemas().subscribe((temas: any) => {
      this.temas = temas;
    });
  }

  newDialog(): void {
    this.dialogRef = this.dialogService.open(CrearTemaComponent, {
      header: 'Nuevo Tema',
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
    this.dialogRef = this.dialogService.open(EditarTemaComponent, {
      header: 'Editar Tema',
      width: '30%',
      contentStyle: { 'height': '150px' },
      data: { idTema: id }
    });
    this.dialogRef.onClose.subscribe((response: any) => {
      if (response) {
        this.getData();
      }
    });
  }

  deleteTema(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Eliminar Tema',
      nzContent: '¿Está seguro que desea eliminar el tema?',
      nzOkText: 'Sí',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzOnOk: () => {
        this.temasService.deleteTema(id).subscribe((response: any) => {
          if (response.Error == null){
            this.getData();
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tema Eliminada Correctamente' });
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar el Tema porque está en algún Libro' });
          }        });
      }
    });
  }


}
