import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/shared/services/account.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulario-recuperacion',
  templateUrl: './formulario-recuperacion.component.html',
  styleUrls: ['./formulario-recuperacion.component.scss'],
})
export class FormularioRecuperacionComponent implements OnInit {
  form: FormGroup;

  returnUrl = '/';

  token: string;

  loading = false;

  errores: string[] = [];

  logoUrl: string = environment.logo;

  constructor(
    private messageSrv: MessageService,
    private accountSrv: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private translateSrv: TranslateService,
  ) {
    if (this.accountSrv.usuarioValue) {
      this.router.navigate(['/backoffice']);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });

    this.form = this.formBuilder.group({
      password: [undefined, Validators.required],
      repeat_password: [undefined, Validators.required],
    });
  }

  recuperar() {
    if (this.form.invalid) {
      return;
    }

    if (this.form?.controls['password'].value === this.form?.controls['repeat_password'].value) {
      this.accountSrv
        .recuperarPassword(this.token, this.form?.controls['password'].value)
        .subscribe(
          data => {
            this.loading = false;
            this.messageSrv.add({
              severity: 'success',
              summary: this.translateSrv.instant('paginas.formularioRecuperacion.success'),
              life: 3000,
            });
            this.router.navigate(['/backoffice/login']);
          },
          error => {
            this.loading = false;
            this.messageSrv.add({
              severity: 'error',
              summary: this.translateSrv.instant('paginas.formularioRecuperacion.error'),
              life: 10000000,
            });
          },
        );
    } else {
      this.messageSrv.add({
        severity: 'warn',
        summary: this.translateSrv.instant('paginas.formularioRecuperacion.equalPasswordError'),
        life: 8000,
      });
    }
  }
}
