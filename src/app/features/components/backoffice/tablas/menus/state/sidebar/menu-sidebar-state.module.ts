import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MenuSidebarEffect } from './menu-sidebar.effects';
import { menuSidebarReducer } from './menu-sidebar.reducer';
import { menuSidebarVariables } from './menu-sidebar.variables';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([MenuSidebarEffect]),
    StoreModule.forFeature(
      menuSidebarVariables.stateName,
      menuSidebarReducer.reducer,
    ),
  ],
})
export class MenuSidebarStateModule {}
