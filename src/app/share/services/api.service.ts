import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.error.message);
    } else {
      console.error(
        `Código del servidor: ${error.status}, ` +
          `Cuerpo del error: ${error.error}`
      );
    }
    return throwError('Algo salió mal; por favor intente nuevamente.');
  }

  GetMethod<T>(action: string){
    return this.http.get(`http://localhost:8080/${action}`)
    .pipe(
      map((response: any) =>{
        return response;
      })
    );
  }
  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(`http://localhost:8080/${url}`, body, { headers })
      .pipe(catchError(this.handleError));
  }
  put<T>(url: string, body: any, headers?: HttpHeaders) {
    return this.http
      .put<T>(`http://localhost:8080/${url}`, body, { headers })
      .pipe(catchError(this.handleError));
  }
  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http
      .delete<T>(`http://localhost:8080/${url}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
