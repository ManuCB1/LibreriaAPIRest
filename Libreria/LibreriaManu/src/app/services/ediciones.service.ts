import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EdicionesService {

  constructor(private httpClient: HttpClient) { }

  getEdiciones() {
    return this.httpClient.get(`${environment.BASE_API_URL}edicion/edicion-controller`);
  }

  postEdicion(edicion: any) {
    return this.httpClient.post(`${environment.BASE_API_URL}edicion/edicion-controller`, edicion);
  }

  putEdicion(edicion: any) {
    return this.httpClient.put(`${environment.BASE_API_URL}edicion/edicion-controller`, edicion);
  }

  deleteEdicion(id: number) {
    return this.httpClient.delete(`${environment.BASE_API_URL}edicion/edicion-controller`, { body: { id: id } });
  }
}
