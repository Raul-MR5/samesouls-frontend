import { HttpClient, HttpParams } from '@angular/common/http';
import { ColumnMetadata } from '@app/shared/models/metadata/column-metadata';
import { Page } from '@app/shared/models/page';
import { RequestFilter } from '@app/shared/models/request-filter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
export abstract class CommonService<T> {
  constructor(protected http: HttpClient, protected endpoint: string) {}

  getMetadata(): Observable<ColumnMetadata[]> {
    return this.http.get<ColumnMetadata[]>(`${this.endpoint}/getMetadata`);
  }

  getAllEntities(): Observable<T[]> {
    return this.http.get<T[]>(`${this.endpoint}/all`);
  }

  getAll(requestFilter: RequestFilter): Observable<Page<T>> {
    let params: HttpParams = new HttpParams();
    if (requestFilter) {
      params = params.append('page', requestFilter.page.toString());
      params = params.append('size', requestFilter.size.toString());

      requestFilter.sort.forEach(sort => {
        params = params.append('sort', `${sort.field},${sort.order}`);
      });

      requestFilter.filter.forEach(f => {
        params = params.append(f.field, f.value);
      });
    }
    return this.http.get<Page<T>>(this.endpoint, { params });
  }

  getAllSimplificado(requestFilter: RequestFilter): Observable<Page<T>> {
    let params: HttpParams = new HttpParams();
    if (requestFilter) {
      params = params.append('page', requestFilter.page.toString());
      params = params.append('size', requestFilter.size.toString());

      requestFilter.sort.forEach(sort => {
        params = params.append('sort', `${sort.field},${sort.order}`);
      });

      requestFilter.filter.forEach(f => {
        params = params.append(f.field, f.value);
      });
    }
    return this.http.get<Page<T>>(`${this.endpoint}/simplificado`, {
      params,
    });
  }

  getOne(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  create(payload: T): Observable<T> {
    return this.http.post<T>(`${this.endpoint}`, payload);
  }

  update(payload: T): Observable<T> {
    const payloadParsed = payload as unknown as any;
    return this.http.put<T>(`${this.endpoint}/${payloadParsed.id}`, payload);
  }

  delete(payload: number) {
    return this.http.delete(`${this.endpoint}/${payload}`);
  }

  count(): Observable<number> {
    return this.http.get<any>(`${this.endpoint}/count`).pipe(map(result => result.count));
  }
}
