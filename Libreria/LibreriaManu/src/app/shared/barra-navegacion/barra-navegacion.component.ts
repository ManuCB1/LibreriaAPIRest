import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.css'
})
export class BarraNavegacionComponent implements OnInit{
  items: MenuItem[] = [];
  home: any = {icon: 'pi pi-home', routerLink:"/"};
  position: 'bottom' = 'bottom';

  ngOnInit(): void {
    this.items = [
      {label: 'Libros', icon: 'assets/icons/libro.png', routerLink:"/main/libro"},
      {label: 'Autores', icon: 'assets/icons/autor.png', routerLink:"/main/autor"},
      {label: 'Temas', icon: 'assets/icons/tema.png', routerLink:"/main/tema"},
    ];
      
  }

}
