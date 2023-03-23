import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import { Idioma } from '@app/shared/models/Idioma.mode';
import { PublicLanguageState } from '@app/shared/state/languages/public-language.state';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../../../shared/services/account.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;

  idiomas: Idioma[] = [];

  idioma: Idioma;

  constructor(
    public app: MainComponent,
    private accountSrv: AccountService,
    private translateSrv: TranslateService,
    private publicLanguageStore: Store<PublicLanguageState>,
  ) {}

  ngOnInit(): void {
    // this.idiomaStore.select(fromIdioma.getIdiomas).pipe(filter(i => i != null)).subscribe(idiomas => {
    //   this.idiomas = idiomas;
    // });

    // this.idiomaStore.select(fromIdioma.getIdioma).pipe(filter(i => i != null)).subscribe(idioma => {
    //   this.idioma = idioma;
    //   this.translateSrv.use(idioma.siglas);
    // });

    this.accountSrv.usuario.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  onIdiomaChange() {
    // this.idiomaStore.dispatch(idiomaActions.setIdioma({ idioma: this.idioma }))
  }
}
