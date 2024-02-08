import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-cierre',
  templateUrl: './barra-cierre.component.html',
  styleUrl: './barra-cierre.component.css'
})
export class BarraCierreComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
