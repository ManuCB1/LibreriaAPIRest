import { response } from 'express';
import { subscribe } from 'diagnostics_channel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { FormatosService } from '../../../services/formatos.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-crear-formato',
  templateUrl: './crear-formato.component.html',
  styleUrl: './crear-formato.component.css'
})
export class CrearFormatoComponent implements OnInit {

  FormsFormato: FormGroup;
  submit$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
    private readonly destroy$: AutoDestroyService,
    private readonly formatosService: FormatosService,
    private readonly messageService: MessageService,
    private readonly dialogRef: DynamicDialogRef) {
    this.FormsFormato = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscribeToSubmit();
  }

  subscribeToSubmit(): void {
    this.submit$
      .pipe(
        tap(() => {
          if (this.FormsFormato.invalid) {
            this.FormsFormato.markAllAsTouched(),
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe completar todos los campos' })
          }
        }),
        filter(() => this.FormsFormato.valid),
        exhaustMap(() => this.formatosService.postFormato(this.FormsFormato.value)),
        takeUntil(this.destroy$)
      )
      .subscribe((response: any) => {
        this.dialogRef.close(response);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Formato creado correctamente' });
      });
  }

}