import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@app/features/components/backoffice/conf/models/config.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private endpoint = `${environment.apiUrl}/config`;

  constructor(private http: HttpClient) {}

  getOneByTag(tag: string): Observable<Config> {
    return this.http.get<Config>(`${this.endpoint}/getOneByTag/${tag}`);
  }

  updateOneByTag(tag: string, payload: string): Observable<any> {
    return this.http.put<any>(
      `${this.endpoint}/updateOneByTag/${tag}`,
      payload,
    );
  }
}
