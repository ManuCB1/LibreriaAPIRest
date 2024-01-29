import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-bread-crum',
  templateUrl: './bread-crum.component.html',
  styleUrl: './bread-crum.component.css'
})
export class BreadCrumComponent implements OnInit{

  items: MenuItem[];

  constructor() {
    this.items = [
      {label: 'Categories'},
      {label: 'Sports'},
      {label: 'Football'},
      {label: 'Countries'},
      {label: 'Spain'},
      {label: 'F.C. Barcelona'}];
   }

  ngOnInit(): void {

  }

  home: any = {icon: 'pi pi-home', routerLink:"/main"};
}
