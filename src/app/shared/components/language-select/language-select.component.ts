import { Component, OnInit } from '@angular/core';
import { Language } from '@app/features/components/backoffice/tablas/languages/models/language.model';
import { publicLanguageActions } from '@app/shared/state/languages/public-language.actions';
import { publicLanguageReducer } from '@app/shared/state/languages/public-language.reducer';
import { PublicLanguageState } from '@app/shared/state/languages/public-language.state';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-language-select',
  templateUrl: 'language-select.component.html',
  styleUrls: ['language-select.component.scss'],
})
export class LanguageSelectComponent implements OnInit {
  languages: Language[];

  language: Language;

  constructor(
    private publicLanguageStore: Store<PublicLanguageState>,
    private translateSrv: TranslateService,
  ) {}

  ngOnInit(): void {
    this.publicLanguageStore
      .select(publicLanguageReducer.getAll)
      .pipe(filter((i) => i != null))
      .subscribe((languages) => {
        this.languages = languages.filter((language) => (!!language.active));
      });

    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(filter((i) => i != null))
      .subscribe((idioma) => {
        this.language = idioma;
        this.translateSrv.use(idioma.siglas);
      });
  }

  onLanguageChange() {
    this.publicLanguageStore.dispatch(
      publicLanguageActions.loadOneSuccess({ payload: this.language }),
    );
  }
}
