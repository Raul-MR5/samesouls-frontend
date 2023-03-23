import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CommonService } from '../../../../../../shared/services/common.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CommonService<Usuario> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/usuarios`);
  }
}
