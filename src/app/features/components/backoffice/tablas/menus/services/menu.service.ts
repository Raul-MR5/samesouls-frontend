import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CommonService } from '../../../../../../shared/services/common.service';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends CommonService<Menu> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/menus`);
  }

  getMenusByUser(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${environment.apiUrl}/menus/allByUser`);
  }
}
