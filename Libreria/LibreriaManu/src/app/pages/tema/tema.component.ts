import { Component } from '@angular/core';
import { TemasService } from '../../services/temas.service';
import { Tema } from '../../core/model/tema';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css'
})
export class TemaComponent {

  temas: Tema[] = [];

  constructor(private temasService: TemasService) { }

  ngOnInit(): void {
    this.temasService.getTemas().subscribe((temas: any) => {
      this.temas = temas;
    },
      (error) => {
        console.log(error);
      });
  }

}
