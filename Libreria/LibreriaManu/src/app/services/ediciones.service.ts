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
}
