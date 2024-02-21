import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  constructor(private httpClient: HttpClient) { }

  getAutores() {
    return this.httpClient.get(`${environment.BASE_API_URL}autor/autor-controller`);
  }

  postAutor(autor: any) {
    return this.httpClient.post(`${environment.BASE_API_URL}autor/autor-controller`, autor);
  }

  // putAutor(autor: any) {
  //   return this.httpClient.put(`${environment.BASE_API_URL}autor/autor-controller`, autor);
  // }

  deleteAutor(id: number) {
    console.log(id);
    return this.httpClient.delete(`${environment.BASE_API_URL}autor/autor-controller`, { body: { id: id } });
  }

}
