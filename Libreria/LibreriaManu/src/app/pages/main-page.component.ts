import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{

  // public fecha: Date | undefined;
  public pista: string = "Mensaje pista";
  nuevoMensaje: string = "";
  contador: number = 0;


  constructor() { 
    console.log("Constructor de PagesModule");
  }

  ngOnInit(): void {
    console.log("ngOnInit de PagesModule");
  }

  incrementarContador(){
    this.contador++;
  }

  decrementarContador(){
    this.contador--;
  }

  setString(){
    this.pista = this.nuevoMensaje;
  }
  


}
