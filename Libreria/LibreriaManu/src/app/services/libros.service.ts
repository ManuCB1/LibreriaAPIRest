import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

//  Se puede quitar el error, pero NO es recomendable
//  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  constructor(private httpClient: HttpClient) { }

  getLibros() {
    return this.httpClient.get(`${environment.BASE_API_URL}libro/libro-controller`);
  }

  // getLibroPorISBN(Isbn: string): any {
  //   const params = new HttpParams().set('Isbn', Isbn);
  //   console.log(params.toString()); // Esto puede ser útil para depurar y verificar los parámetros en la consola
  //     return this.httpClient.get(`${environment.BASE_API_URL}libro/libro-controller/byIsbn`, { params: params} );
  // }

  putLibro(libro: any) {
    return this.httpClient.put(`${environment.BASE_API_URL}libro/libro-controller`, libro);
  }

  postLibro(libro: any) {
    return this.httpClient.post(`${environment.BASE_API_URL}libro/libro-controller`, libro);
  }

  deleteLibro(Isbn: string) {
    return this.httpClient.delete(`${environment.BASE_API_URL}libro/libro-controller`, { body: { Isbn: Isbn } });
  }

}
