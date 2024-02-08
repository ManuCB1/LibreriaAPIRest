import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private options = {
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': 'http://localhost:4200'
    },
  };

  private url = 'https://localhost:44371/api/';
  
  constructor(private httpClient: HttpClient) { 
    // Se puede quitar el error, pero NO es recomendable
    // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
  }

  public getLibros() {
  //   this.httpClient.get('https://localhost:44371/api/libro/libro-controller')
  // .subscribe(
  //   (data) => {
  //     // Procesar datos exitosos
  //   },
  //   (error) => {
  //     console.error('Error en la solicitud:', error);
  //   }
  // );
    return this.httpClient.get(`${this.url}libro/libro-controller`, this.options);
  }
}
