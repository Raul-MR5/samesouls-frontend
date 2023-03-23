import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CommonService } from '../../../../../../shared/services/common.service';
import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends CommonService<Language> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/languages`);
  }
}
