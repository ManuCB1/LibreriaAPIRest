import { subscribe } from 'diagnostics_channel';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';
import { EdicionesService } from '../../../services/ediciones.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-editar-edicion',
  templateUrl: './editar-edicion.component.html',
  styleUrl: './editar-edicion.component.css'
})
export class EditarEdicionComponent {

  FormsEdicion: FormGroup;
  submit$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
    private readonly edicionesService: EdicionesService,
    private readonly destroy$: AutoDestroyService,
    private messageService: MessageService,
    private dialogConfig: DynamicDialogConfig,
    private readonly dialogRef: DynamicDialogRef) {
    this.FormsEdicion = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscribeToSubmit();    
  }

  subscribeToSubmit(): void {
    this.submit$.pipe(
      tap(() => {
        if (this.FormsEdicion.invalid) {
          this.FormsEdicion.markAllAsTouched();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos' });
        }
      }),
      filter(() => this.FormsEdicion.valid),
      exhaustMap(() => this.edicionesService.putEdicion({
        Id: this.dialogConfig.data.Id,
        Nombre: this.FormsEdicion.value.nombre
      })),
      takeUntil(this.destroy$)
    )
    .subscribe(
      (response: any) => {
        this.dialogRef.close(response);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Edición Guardada Correctamente' });
      });
  }
}
