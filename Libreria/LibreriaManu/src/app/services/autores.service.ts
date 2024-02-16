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

}
