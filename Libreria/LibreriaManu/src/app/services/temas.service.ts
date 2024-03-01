import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  constructor(private httpClient: HttpClient) { }

  getTemas() {
    return this.httpClient.get(`${environment.BASE_API_URL}tema/temas-controller`);
  }

  postTema(tema: any) {
    return this.httpClient.post(`${environment.BASE_API_URL}tema/temas-controller`, tema);
  }

  putTema(tema: any) {
    return this.httpClient.put(`${environment.BASE_API_URL}tema/temas-controller`, tema);
  }

  deleteTema(id: number) {
    return this.httpClient.delete(`${environment.BASE_API_URL}tema/temas-controller`, { body: { id: id } });
  }

}
