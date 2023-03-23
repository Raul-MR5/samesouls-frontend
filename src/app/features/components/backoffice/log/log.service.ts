import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private http: HttpClient) {}

  getLog(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/log`, { responseType: 'text' }).pipe(
      filter(isLoaded => !!isLoaded),
      take(1),
      catchError(e => {
        if (e.statys !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }),
    );
  }
}
