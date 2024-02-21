import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

//  Se puede quitar el error, pero NO es recomendable
//  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  constructor(private httpClient: HttpClient) {}

  getLibros() {
    return this.httpClient.get(`${environment.BASE_API_URL}libro/libro-controller`);
  }

  postLibro(libro: any) {
    return this.httpClient.post(`${environment.BASE_API_URL}libro/libro-controller`, libro);
  }

}
