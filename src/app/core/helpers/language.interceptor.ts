import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publicLanguageReducer } from '@app/shared/state/languages/public-language.reducer';
import { PublicLanguageState } from '@app/shared/state/languages/public-language.state';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private publicLanguageStore: Store<PublicLanguageState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(environment.apiUrl) === -1) {
      return next.handle(request);
    }
    // if (request.method !== 'GET' && request.method !== 'PUT') {
    //   return next.handle(request);
    // }
    return this.publicLanguageStore.select(publicLanguageReducer.getOne).pipe(
      take(1),
      switchMap(language => {
        // eslint-disable-next-line no-param-reassign
        request = request.clone({
          setParams: {
            lang: language ? language.siglas : 'es',
          },
        });
        return next.handle(request);
      }),
    );

    // request = request.clone({
    //   setParams:{
    //     language: "es"
    //   }
    // });
    // return next.handle(request);
  }
}
