import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FormatosService {

  constructor(private httpClient: HttpClient) { }

  getFormatos() {
    return this.httpClient.get(`${environment.BASE_API_URL}formato/formato-controller`);
  }

  postFormato(formato: any) {
    return this.httpClient.post(`${environment.BASE_API_URL}formato/formato-controller`, formato);
  }

  putFormato(formato: any) {
    return this.httpClient.put(`${environment.BASE_API_URL}formato/formato-controller`, formato);
  }

  deleteFormato(id: number) {
    return this.httpClient.delete(`${environment.BASE_API_URL}formato/formato-controller`, { body: { id: id } });
  }
}
