import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri:string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  
  // Criar Colaborador
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/colaborador-post`;
    return this.http.post(url, data, {headers: this.headers})
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Retornar todos os Colaboradores
  getColaboradores() {
    return this.http.get(`${this.baseUri}/colaboradores`);
  }

  // Mostrar um determinado Colaborador
  getColaborador(id): Observable<any> {
    let url = `${this.baseUri}/colaborador/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Atualizar Colaborador
  updateColaborador(id, data): Observable<any> {
    let url = `${this.baseUri}/colaborador-up/${id}`;
    return this.http.put(url, data)
  }

  // Deletar colaborador
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/colaborador-del/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
