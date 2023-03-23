import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../../shared/services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  publicUrls: { url: string; method: string }[] = [
    { url: '/public/**', method: 'GET' },
    { url: '/backoffice/login', method: 'GET' },
  ];

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url

    // const usuario = this.accountService.usuarioValue;
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    // this.accountService.getToken()
    const isLoggedIn = usuario;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      if (this.needToken(request)) {
        // eslint-disable-next-line no-param-reassign
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${usuario.token}`,
          },
        });
      }
    }

    return next.handle(request);
  }

  needToken(request: HttpRequest<any>): boolean {
    let result = false;
    this.publicUrls.forEach(publicUrl => {
      if (publicUrl.url.endsWith('/**')) {
        result =
          result ||
          (request.url.startsWith(`${environment.apiUrl}${publicUrl.url.replace('/**', '')}`) &&
            request.method.toLowerCase() === publicUrl.method.toLowerCase());
      } else {
        result =
          result ||
          (request.url === `${environment.apiUrl}${publicUrl.url}` &&
            request.method.toLowerCase() === publicUrl.method.toLowerCase());
      }
    });
    return !result;
  }
}
