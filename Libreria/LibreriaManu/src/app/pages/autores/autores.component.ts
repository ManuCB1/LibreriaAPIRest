import { Component } from '@angular/core';
import { AutoresService } from '../../services/autores.service';
import { Autor } from '../../core/model/autor';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent {

  autores: Autor[] | undefined;

  constructor(private autoresService: AutoresService) {}
  
  ngOnInit(): void {
    this.autoresService.getAutores().subscribe((autores : any) => {
      this.autores = autores;
    },
    (error) => {
      console.log(error);
    });
  }

}
