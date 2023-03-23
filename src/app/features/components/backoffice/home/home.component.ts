import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '@app/features/components/backoffice/tablas/menus/models/menu.model';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import * as fromAccount from '@app/shared/state/account/account.reducer';
import { publicLanguageReducer } from '@app/shared/state/languages/public-language.reducer';
import { PublicLanguageState } from '@app/shared/state/languages/public-language.state';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { menuSidebarReducer } from '../tablas/menus/state/sidebar/menu-sidebar.reducer';
import { MenuSidebarState } from '../tablas/menus/state/sidebar/menu-sidebar.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  permisos: Permiso[] = [];

  menus$: Observable<Menu[]> = this.menuSidebarState.select(menuSidebarReducer.getAll);

  loading$: Observable<boolean> = this.menuSidebarState.select(menuSidebarReducer.getLoading);

  constructor(
    private translateSrv: TranslateService,
    private router: Router,
    private publicLanguageStore: Store<PublicLanguageState>,
    private accountStore: Store<fromAccount.AppState>,
    private menuSidebarState: Store<MenuSidebarState>,
  ) {}

  ngOnInit(): void {
    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(filter(i => i != null))
      .subscribe(language => {
        this.translateSrv.use(language.siglas);
      });
    this.accountStore
      .select(fromAccount.getPermisos)
      // eslint-disable-next-line no-return-assign
      .subscribe(permisos => (this.permisos = permisos));
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
