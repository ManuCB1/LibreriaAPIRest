import { subscribe } from 'diagnostics_channel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { FormatosService } from '../../../services/formatos.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-editar-formato',
  templateUrl: './editar-formato.component.html',
  styleUrl: './editar-formato.component.css'
})
export class EditarFormatoComponent implements OnInit{

  FormsFormato: FormGroup;
  submit$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
    private readonly destroy$: AutoDestroyService,
    private readonly formatosService: FormatosService,
    private readonly messageService: MessageService,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig) {
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
        exhaustMap(() => this.formatosService.putFormato({
          id: this.dialogConfig.data.Id,
          nombre: this.FormsFormato.value.nombre
        })),
        takeUntil(this.destroy$)
      )
      .subscribe((response: any) => {
        this.dialogRef.close(response);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Formato creado correctamente' });
      });
  }
}
