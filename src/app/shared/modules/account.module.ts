import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AccountService } from '../services/account.service';
import { AccountEffect } from '../state/account/account.effects';
import { accountReducer } from '../state/account/account.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    EffectsModule.forFeature([AccountEffect]),
    StoreModule.forFeature('account', accountReducer),
  ],
  providers: [AccountService],
})
export class AccountModule {}
