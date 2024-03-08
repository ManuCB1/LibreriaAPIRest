import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  // public fecha: Date | undefined;
  public pista: string = "Mensaje pista";
  nuevoMensaje: string = "";
  contador: number = 0;
  
}
