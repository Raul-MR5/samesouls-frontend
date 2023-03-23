import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { DesktopGuard } from './shared/guards/desktop.guard';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  {
    path: 'public',
    canActivate: [DesktopGuard],
    loadChildren: () => import('./core/layout/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'backoffice',
    loadChildren: () =>
      import('./core/layout/backoffice/backoffice.module').then(m => m.BackofficeModule),
  },
  {
    path: 'error/:error/:message/:path/:status/:timestamp',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: 'errors/Not Found/404 NOT_FOUND/null/404/null',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // relativeLinkResolution: 'legacy',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
