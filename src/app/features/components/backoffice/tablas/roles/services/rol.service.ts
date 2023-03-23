import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CommonService } from '../../../../../../shared/services/common.service';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root',
})
export class RolService extends CommonService<Rol> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/roles`);
  }
}
