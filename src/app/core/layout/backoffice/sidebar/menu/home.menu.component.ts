import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/features/components/backoffice/tablas/menus/models/menu.model';
import { MenuService } from '@app/features/components/backoffice/tablas/menus/services/menu.service';
import { MenuSidebarState } from '@app/features/components/backoffice/tablas/menus/state/sidebar/menu-sidebar.state';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { Action as accountActions } from '@app/shared/state/account/account.actions';
import * as fromAccount from '@app/shared/state/account/account.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { menuSidebarActions } from '../../../../../features/components/backoffice/tablas/menus/state/sidebar/menu-sidebar.actions';
import { menuSidebarReducer } from '../../../../../features/components/backoffice/tablas/menus/state/sidebar/menu-sidebar.reducer';
import { MainComponent } from '../../main/main.component';

@Component({
  selector: 'app-home-menu',
  template: `
    <div class="menu-scroll-content">
      <ul class="navigation-menu" *ngIf="(loading$ | async) === false">
        <li
          app-menuitem
          *ngFor="let item of model; let i = index"
          [item]="item"
          [index]="i"
          [root]="true"></li>
      </ul>
      <ul class="navigation-menu p-3" *ngIf="loading$ | async">
        <li class="pt-2">
          <p-skeleton width="100%" height="3rem"></p-skeleton>
        </li>
        <li class="pt-2">
          <p-skeleton width="100%" height="3rem"></p-skeleton>
        </li>
        <li class="pt-2">
          <p-skeleton width="100%" height="3rem"></p-skeleton>
        </li>
      </ul>
    </div>
  `,
})
export class HomeMenuComponent implements OnInit {
  public model: any[];

  permisos: Permiso[] = [];

  menus: any[] = [];

  entities$: Observable<Menu[]> = this.menuSidebarState.select(menuSidebarReducer.getAll);

  loading$: Observable<boolean> = this.menuSidebarState.select(menuSidebarReducer.getLoading);

  constructor(
    public app: MainComponent,
    private menuService: MenuService,
    private menuSidebarState: Store<MenuSidebarState>,
    private accountStore: Store<fromAccount.AppState>,
  ) {}

  ngOnInit() {
    this.menuSidebarState.dispatch(menuSidebarActions.loadAllByUser());
    this.accountStore.dispatch(accountActions.loadPermisos());
    this.entities$.subscribe(menus => {
      this.menus = menus;
      this.model = this.buildMenu(
        this.menus.filter(menu => menu.ruta !== null || menu.menus.length > 0),
      );
    });
    // this.menuService.getMenus().subscribe(menus => {
    //   this.menus = menus;
    //   this.model = this.buildMenu(this.menus.filter(menu => menu.ruta !== null || menu.menus.length >0));
    // })
  }

  buildMenu(menus: Menu[]): any[] {
    return menus.map(menu => {
      const level = {
        label: menu.nombre,
        icon: menu.icono,
        items: null,
        routerLink: null,
      };
      if (menu.menus && menu.menus.length > 0) {
        level.items = this.buildMenu(menu.menus);
      } else {
        level.routerLink = [menu.ruta];
      }
      return level;
    });
  }

  changeTheme(theme) {
    this.changeStyleSheetsColor('theme-css', `theme-${theme}.css`);
    this.changeStyleSheetsColor('layout-css', `layout-${theme}.css`);
  }

  changeStyleSheetsColor(id, value) {
    const element = document.getElementById(id);
    const urlTokens = element.getAttribute('href').split('/');
    urlTokens[urlTokens.length - 1] = value;

    const newURL = urlTokens.join('/');

    this.replaceLink(element, newURL);
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  replaceLink(linkElement, href) {
    if (this.isIE()) {
      linkElement.setAttribute('href', href);
    } else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', `${id}-clone`);

      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', id);
      });
    }
  }
}
