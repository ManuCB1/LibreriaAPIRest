import { TemasService } from './../../../services/temas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, exhaustMap, filter, takeUntil, tap } from 'rxjs';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-tema',
  templateUrl: './crear-tema.component.html',
  styleUrl: './crear-tema.component.css'
})
export class CrearTemaComponent implements OnInit {

  FormsTema: FormGroup;
  submit$: Subject<void> = new Subject<void>();

  constructor(private readonly destroy$: AutoDestroyService,
    private fb: FormBuilder,
    private readonly temasService: TemasService,
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
      filter(() => this.FormsTema.valid),
      exhaustMap(() => this.temasService.postTema(this.FormsTema.value)),
      takeUntil(this.destroy$)
    )
      .subscribe(
        (response: any) => {
          this.dialogRef.close(response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tema Guardado Correctamente' });
        });
  }

}
