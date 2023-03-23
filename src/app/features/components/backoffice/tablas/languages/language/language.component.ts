// AMGULAR
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { RequestFilter } from '@app/shared/models/request-filter';
import { TableConfig } from '@app/shared/models/table-config/table-config';
import { Action as accountActions } from '@app/shared/state/account/account.actions';
import * as fromAccount from '@app/shared/state/account/account.reducer';
import { publicLanguageReducer } from '@app/shared/state/languages/public-language.reducer';
import { PublicLanguageState } from '@app/shared/state/languages/public-language.state';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
import { Language } from '../models/language.model';
import { languageActions } from '../state/language.actions';
import { languageReducer } from '../state/language.reducer';
import { LanguageState } from '../state/language.state';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  @ViewChild(LanguageModalComponent) modal: LanguageModalComponent;

  entities$: Observable<Language[]> = this.store.select(languageReducer.getAll);

  loading$: Observable<boolean> = this.store.select(languageReducer.getLoading);

  count$: Observable<number> = this.store.select(languageReducer.getCount);

  requestFilter: RequestFilter = environment.defaultRequestFilter;

  tableConfig: TableConfig;

  loadTable = false;

  permisos: Permiso[] = [];

  constructor(
    private store: Store<LanguageState>,
    private toastSrv: MessageService,
    private router: Router,
    private accountStore: Store<fromAccount.AppState>,
    private translateSrv: TranslateService,
    private confirmationSrv: ConfirmationService,
    private messageSrv: MessageService,
    private publicLanguageStore: Store<PublicLanguageState>,
  ) {}

  ngOnInit(): void {
    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(filter((i) => i != null))
      .subscribe((language) => {
        this.translateSrv.use(language.siglas);
      });

    this.translateSrv.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarPagina();
    });

    this.cargarPagina();
    this.getAll();
  }

  cargarPagina() {
    const optionButtons = [];
    const topButtons = [];
    const entityName = 'ARQUITECTO';

    const createPermission = this.permisos.find(
      (permiso) => permiso.codigo === `CREATE_${entityName}`,
    );
    const updatePermission = this.permisos.find(
      (permiso) => permiso.codigo === `UPDATE_${entityName}`,
    );
    const deletePermission = this.permisos.find(
      (permiso) => permiso.codigo === `DELETE_${entityName}`,
    );

    createPermission !== undefined
      ? topButtons.push({
        action: 'add',
        icon: 'pi pi-plus',
        label: this.translateSrv.instant('buttons.new', {
          name: this.translateSrv.instant('tables.language.singular'),
        }),
      })
      : null;

    updatePermission !== undefined
      ? optionButtons.push({ action: 'edit', icon: 'pi pi-pencil' })
      : null;
    deletePermission !== undefined
      ? optionButtons.push({ action: 'delete', icon: 'pi pi-trash' })
      : null;

    this.tableConfig = {
      fieldConfig: [
        {
          field: 'siglas',
          nombre: this.translateSrv.instant('columns.siglas'),
          sort: true,
          filter: true,
        },
        {
          field: 'name',
          nombre: this.translateSrv.instant('columns.name'),
          sort: true,
          filter: true,
        },
        {
          field: 'nativeName',
          nombre: this.translateSrv.instant('columns.nativeName'),
          sort: true,
          filter: true,
        },
        {
          field: 'active',
          nombre: this.translateSrv.instant('columns.active'),
          sort: true,
          filter: true,
          tipo: 'ACTIVO',
        },
      ],
      optionButtons,
      topButtons,
    };
  }

  getAll() {
    this.accountStore.dispatch(accountActions.loadPermisos());
    this.accountStore
      .select(fromAccount.getPermisos)
      .pipe(filter((permisos) => permisos !== null))
      .subscribe((permisos) => {
        this.permisos = permisos;
        this.cargarPagina();
        this.loadTable = true;
      });
    this.store.dispatch(
      languageActions.loadAll({ payload: this.requestFilter }),
    );
  }

  onClick(event) {
    switch (event.type) {
      case 'add': {
        this.router.navigate([
          'backoffice',
          'languages',
          { modalMode: 'CREATE' },
        ]);
        break;
      }
      case 'edit': {
        this.router.navigate([
          'backoffice',
          'languages',
          { modalMode: 'UPDATE', id: event.data.id },
        ]);
        break;
      }
      case 'delete': {
        this.confirmationSrv.confirm({
          message: this.translateSrv.instant('messages.confirmation.message', {
            name: this.translateSrv.instant('tables.language.singular'),
          }),
          header: this.translateSrv.instant('messages.confirmation.header'),
          icon: 'pi pi-info-circle',
          rejectLabel: this.translateSrv.instant('buttons.reject'),
          acceptLabel: this.translateSrv.instant('buttons.accept'),
          accept: () => {
            this.store.dispatch(languageActions.delete({ id: event.data.id }));
          },
        });
        break;
      }
    }
  }

  onWarnClose() {
    this.toastSrv.clear('forbidden');
    this.router.navigate(['/']);
  }
}
