import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { LanguagesModule } from '@app/shared/modules/languages.module';
import { ButtonModule } from 'primeng/button';
import { SwaggerComponent } from './swagger.component';

const routes: Routes = [
  {
    path: '',
    component: SwaggerComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [SwaggerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ButtonModule,
    LanguagesModule,
  ],
})
export class SwaggerModule {}
