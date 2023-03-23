import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiError } from '@app/shared/components/error-page/models/api-error';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AccountService } from '../../shared/services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountSrv: AccountService, private toastSrv: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        let result: any;
        if (err.error instanceof ErrorEvent) {
          // client-side error
          result = `Error: ${err.error.message}`;
        } else {
          // server-side error
          result = <ApiError>err.error;
        }

        if (err.status === 401) {
          this.accountSrv.logout();
        }

        if (err.status === 403) {
          // this.toastSrv.add({severity: 'warn', detail: 'No tienes permisos para acceder a este recurso!'});
        }

        return throwError(result);
      }),
    );
  }
}
