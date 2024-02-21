import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoresService } from '../../../services/autores.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { Subject, exhaustMap, filter, mergeMap, of, takeUntil, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html',
  styleUrl: './crear-autor.component.css'
})
export class CrearAutorComponent implements OnInit {

  FormsAutor: FormGroup;
  submit$: Subject<void> = new Subject<void>();

  constructor(
    private readonly destroy$: AutoDestroyService,
    private fb: FormBuilder,
    private readonly autoresService: AutoresService,
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
        exhaustMap(() => this.autoresService.postAutor(this.FormsAutor.value)),
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
