import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { Action as accountActions } from '@app/shared/state/account/account.actions';
import * as fromAccount from '@app/shared/state/account/account.reducer';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  returnUrl = '/';

  permisos: Permiso[] = [];

  loading = false;

  errores: string[] = [];

  nombre: string = environment.nombre;

  logoUrl: string = environment.logo;

  constructor(
    private messageSrv: MessageService,
    private accountSrv: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    private accountStore: Store<fromAccount.AppState>,
    private translateSrv: TranslateService,
  ) {
    translate.setDefaultLang('es');
    if (this.accountSrv.usuarioValue) {
      this.router.navigate(['/backoffice']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/backoffice';

    this.form = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }

  inputChange(data) {}

  login() {
    this.loading = true;
    if (this.form.invalid) {
      return;
    }

    this.accountSrv
      .login(this.form.value.username, this.form.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.messageSrv.add({
            severity: 'success',
            summary: this.translateSrv.instant('paginas.login.success'),
            life: 3000,
          });
          this.accountStore.dispatch(accountActions.loadUsuario());
          this.accountStore.dispatch(accountActions.loadPermisos());
          this.router.navigate(['/backoffice']);
        },
        error => {
          this.loading = false;
          this.messageSrv.add({
            severity: 'error',
            summary: this.translateSrv.instant('paginas.login.error'),
            life: 10000000,
          });
        },
      );
  }
}
