import { subscribe } from 'diagnostics_channel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';
import { EdicionesService } from '../../../services/ediciones.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { response } from 'express';

@Component({
  selector: 'app-crear-edicion',
  templateUrl: './crear-edicion.component.html',
  styleUrl: './crear-edicion.component.css'
})
export class CrearEdicionComponent implements OnInit {

  FormsEdicion: FormGroup;
  submit$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
    private readonly destroy$: AutoDestroyService,
    private readonly edicionService: EdicionesService,
    private readonly messageService: MessageService,
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
      exhaustMap(() => this.edicionService.postEdicion(this.FormsEdicion.value)),
      takeUntil(this.destroy$)
    )
      .subscribe(
        (response: any) => {
          this.dialogRef.close(response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Edición Guardada Correctamente' });
        }
      )
  }
}
