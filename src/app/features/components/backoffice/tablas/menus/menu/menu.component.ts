/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '@app/features/components/backoffice/tablas/menus/models/menu.model';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { RequestFilter } from '@app/shared/models/request-filter';
import { TableConfig } from '@app/shared/models/table-config/table-config';
import * as fromAccount from '@app/shared/state/account/account.reducer';
import { publicLanguageReducer } from '@app/shared/state/languages/public-language.reducer';
import { PublicLanguageState } from '@app/shared/state/languages/public-language.state';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuModalComponent } from '../menu-modal/menu-modal.component';
import { menuActions } from '../state/menu.actions';
import { menuReducer } from '../state/menu.reducer';
import { MenuState } from '../state/menu.state';
import { menuSidebarActions } from '../state/sidebar/menu-sidebar.actions';
import { MenuSidebarState } from '../state/sidebar/menu-sidebar.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild(MenuModalComponent) modal: MenuModalComponent;

  entities$: Observable<Menu[]> = this.store.select(menuReducer.getAll);

  loading$: Observable<boolean> = this.store.select(menuReducer.getLoading);

  count$: Observable<number> = this.store.select(menuReducer.getCount);

  requestFilter: RequestFilter = environment.defaultRequestFilter;

  tableConfig: TableConfig;

  permisos: Permiso[] = [];

  loadTable = false;

  constructor(
    private store: Store<MenuState>,
    private toastSrv: MessageService,
    private router: Router,
    private accountStore: Store<fromAccount.AppState>,
    private confirmationSrv: ConfirmationService,
    private messageSrv: MessageService,
    private translateSrv: TranslateService,
    private publicLanguageStore: Store<PublicLanguageState>,
    private menuSidebarState: Store<MenuSidebarState>,
  ) {}

  ngOnInit(): void {
    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(filter(i => i != null))
      .subscribe(language => {
        this.translateSrv.use(language.siglas);
      });

    this.translateSrv.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarPagina();
    });

    this.cargarPagina();
    this.getAll();

    this.store.select(menuReducer.getMessage).subscribe(console.log);
  }

  cargarPagina() {
    const optionButtons = [];
    const topButtons = [];
    const entityName = 'ITINERARIO';

    const createPermission = this.permisos.find(
      permiso => permiso.codigo === `CREATE_${entityName}`,
    );
    const updatePermission = this.permisos.find(
      permiso => permiso.codigo === `UPDATE_${entityName}`,
    );
    const deletePermission = this.permisos.find(
      permiso => permiso.codigo === `DELETE_${entityName}`,
    );

    topButtons.push({
      action: 'add',
      icon: 'pi pi-plus',
      label: this.translateSrv.instant('buttons.new', {
        name: this.translateSrv.instant('tables.menu.singular'),
      }),
    });

    optionButtons.push({ action: 'edit', icon: 'pi pi-pencil' });
    optionButtons.push({ action: 'delete', icon: 'pi pi-trash' });

    this.tableConfig = {
      fieldConfig: [
        {
          field: 'icono',
          nombre: this.translateSrv.instant('columns.icono'),
          sort: false,
          filter: false,
          tipo: 'ICONO',
        },
        {
          field: 'nombre',
          nombre: this.translateSrv.instant('columns.nombre'),
          sort: true,
          filter: true,
          tipo: 'TEXTO',
        },
        {
          field: 'orden',
          nombre: this.translateSrv.instant('columns.orden'),
          sort: true,
          filter: true,
          tipo: 'TEXTO',
        },
        {
          field: 'ruta',
          nombre: this.translateSrv.instant('columns.ruta'),
          sort: true,
          filter: true,
          tipo: 'TEXTO',
        },
      ],
      optionButtons,
      topButtons,
    };
  }

  getAll() {
    this.store.dispatch(menuActions.loadAll({ payload: this.requestFilter }));
  }

  onClick(event) {
    switch (event.type) {
      case 'add': {
        this.router.navigate(['backoffice', 'menus', { modalMode: 'CREATE' }]);
        break;
      }
      case 'edit': {
        this.router.navigate(['backoffice', 'menus', { modalMode: 'UPDATE', id: event.data.id }]);
        break;
      }
      case 'delete': {
        this.confirmationSrv.confirm({
          message: this.translateSrv.instant('messages.confirmation.message', {
            name: this.translateSrv.instant('tables.menu.singular'),
          }),
          header: this.translateSrv.instant('messages.confirmation.header'),
          icon: 'pi pi-info-circle',
          rejectLabel: this.translateSrv.instant('buttons.reject'),
          acceptLabel: this.translateSrv.instant('buttons.accept'),
          accept: () => {
            this.store.dispatch(menuActions.delete({ id: event.data.id }));
            this.menuSidebarState.dispatch(menuSidebarActions.loadAllByUser());
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
