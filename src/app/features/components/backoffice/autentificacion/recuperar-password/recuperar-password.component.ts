import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
})
export class RecuperarPasswordComponent implements OnInit {
  form: FormGroup;

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
    this.form = this.formBuilder.group({
      correo: [undefined, Validators.required],
    });
  }

  recuperar() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.accountSrv.solicitarPassword(this.form?.controls['correo'].value).subscribe(
      data => {
        this.loading = false;
        this.messageSrv.add({
          severity: 'success',
          summary: this.translateSrv.instant('paginas.recuperarPassword.success'),
          life: 3000,
        });
        // this.router.navigate(['/backoffice/login']);
      },
      error => {
        this.loading = false;
        this.messageSrv.add({
          severity: 'error',
          summary: this.translateSrv.instant('paginas.recuperarPassword.error'),
          life: 10000000,
        });
      },
    );
  }
}
