import { Component, OnInit } from '@angular/core';
import { Edicion } from '../../core/model/edicion';
import { EdicionesService } from '../../services/ediciones.service';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil, tap } from 'rxjs';
import { CrearEdicionComponent } from './crear-edicion/crear-edicion.component';
import { EditarEdicionComponent } from './editar-edicion/editar-edicion.component';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.css'
})
export class EdicionComponent implements OnInit {

  ediciones: Edicion[] = [];

  constructor(private edicionService: EdicionesService,
    private readonly destroy$: AutoDestroyService,
    private readonly dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly modalService: NzModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.edicionService.getEdiciones()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.ediciones = response;
      });
  }

  newDialog() {
    this.dialogRef = this.dialogService.open(CrearEdicionComponent, {
      header: 'Nueva Edición',
      width: '30%',
      contentStyle: { 'height': '150px' },
    });
    this.dialogRef.onClose.subscribe((response: any) => {
      if (response) {
        this.getData();
      }
    });
  }

  updateDialog(id: number) {
    this.dialogRef = this.dialogService.open(EditarEdicionComponent, {
      header: 'Editar Edición',
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

  deleteEdicion(id: number): void {
    this.modalService.confirm({
      nzTitle: '¿Está seguro que desea eliminar la edición?',
      nzContent: 'Una vez eliminada la edición no podrá ser recuperada',
      nzOkText: 'Sí',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzOnOk: () => {
        this.edicionService.deleteEdicion(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            if (response.Error == null){
              this.getData();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Edición Eliminada Correctamente' });
            }else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar la Edición porque está en algún Libro' });
            }
          });
      },
    });
  }


}
