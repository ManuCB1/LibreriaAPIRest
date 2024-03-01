import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { AutoresService } from '../../../services/autores.service';
import { MessageService } from 'primeng/api';
import { subscribe } from 'diagnostics_channel';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-editar-autor',
  templateUrl: './editar-autor.component.html',
  styleUrl: './editar-autor.component.css'
})
export class EditarAutorComponent implements OnInit {

  FormsAutor: FormGroup;
  submit$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
    private readonly autoresService: AutoresService,
    private readonly destroy$: AutoDestroyService,
    private dialogConfig: DynamicDialogConfig,
    private readonly messageService: MessageService,
    private readonly dialogRef: DynamicDialogRef) {
    this.FormsAutor = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.subscribeToSubmit();
  }

  subscribeToSubmit(): void {
    this.submit$
      .pipe(
        tap(() => {
          if (this.FormsAutor.invalid) {
            this.FormsAutor.markAllAsTouched();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos' });
          }
        }),
        filter(() => this.FormsAutor.valid),
        exhaustMap(() => this.autoresService.putAutor({
          id: this.dialogConfig.data.idAutor,
          nombre: this.FormsAutor.value.nombre
        })),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response: any) => {
          this.dialogRef.close(response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Autor Guardado Correctamente' });
        });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
