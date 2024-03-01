import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, exhaustMap, takeUntil, tap } from 'rxjs';
import { TemasService } from '../../../services/temas.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';

@Component({
  selector: 'app-editar-tema',
  templateUrl: './editar-tema.component.html',
  styleUrl: './editar-tema.component.css'
})
export class EditarTemaComponent implements OnInit {

  FormsTema: FormGroup;
  submit$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
    private readonly destroy$: AutoDestroyService,
    private readonly temasService: TemasService,
    private dialogConfig: DynamicDialogConfig,
    private readonly messageService: MessageService,
    private readonly dialogRef: DynamicDialogRef) {
    this.FormsTema = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.subscribeToSubmit();
  }

  subscribeToSubmit() {
    this.submit$.pipe(
      tap(() => {
        if (this.FormsTema.invalid) {
          this.FormsTema.markAllAsTouched();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos' });
        }
      }),
      exhaustMap(() => this.temasService.putTema({
        id: this.dialogConfig.data.idTema,
        nombre: this.FormsTema.value.nombre
      })),
      takeUntil(this.destroy$)
    )
      .subscribe(
        (response: any) => {
          this.dialogRef.close(response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tema Guardado Correctamente' });
        });
  }
}
