import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CommonService } from '../../../../../../shared/services/common.service';
import { Permiso } from '../models/permiso.model';

@Injectable({
  providedIn: 'root',
})
export class PermisoService extends CommonService<Permiso> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/permisos`);
  }
}
