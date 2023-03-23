/* eslint-disable no-param-reassign */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Permiso } from '../../features/components/backoffice/tablas/permisos/models/permiso.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private usuarioSubject: BehaviorSubject<Usuario | null>;

  public usuario: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.usuarioSubject = new BehaviorSubject<Usuario | null>(
      JSON.parse(localStorage.getItem('usuario')),
    );
    this.usuario = this.usuarioSubject.asObservable();
  }

  public get usuarioValue(): Usuario {
    return this.usuarioSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.backUrl}/login`, {
        username,
        password,
      })
      .pipe(
        map(response => {
          const usuario: Usuario = {
            ...response.usuario,
            token: response.token,
          };
          localStorage.removeItem('usuario');
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.usuarioSubject.next(usuario);
          return usuario;
        }),
      );
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }

  solicitarPassword(email: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('responseType', 'text');

    return this.http
      .post<any>(`${environment.apiUrl}/usuarios/reset-password?correo=${email}`, { headers })
      .pipe(take(1));
  }

  recuperarPassword(token: string, password: string): Observable<string> {
    return this.http
      .put<any>(`${environment.apiUrl}/usuarios/reset-password/${token}`, {
        password,
      })
      .pipe(take(1));
  }

  getUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/account`);
  }

  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${environment.apiUrl}/account/permisos`);
  }

  getToken(): string {
    const usuario = localStorage.getItem('usuario');

    return usuario ? JSON.parse(usuario).token : null;
  }

  getTokenExpirationDate(token: string): Date | undefined {
    const decoded: any = jwt_decode(token);
    if (decoded.exp === undefined) return undefined;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
