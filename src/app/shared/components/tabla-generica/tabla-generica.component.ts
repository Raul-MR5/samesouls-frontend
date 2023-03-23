/* eslint-disable no-restricted-syntax */
/* eslint-disable @angular-eslint/no-output-rename */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestFilter } from '@app/shared/models/request-filter';
import { LazyLoadEvent } from 'primeng/api';
import { TableConfig } from '../../models/table-config/table-config';
import { Tipo } from './campo/campo.component';

@Component({
  selector: 'app-tabla-generica',
  templateUrl: './tabla-generica.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0,
        }),
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        }),
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
  styleUrls: ['./tabla-generica.component.scss'],
})
export class TablaGenericaComponent implements OnInit {
  tipos = Tipo;

  lazy = true;

  paginators: number[] = [10, 25, 50];

  @Input() entities: any[] = [];

  @Input() loading: boolean;

  @Input() totalRecords: number;

  @Input() permisos: string[] = [];

  @Input() tableConfig: TableConfig;

  @Input() selection: any;

  @Output('selectionChange') onSelectionChange = new EventEmitter<any>();

  @Input() requestFilter: RequestFilter;

  @Output() requestFilterChange: EventEmitter<RequestFilter> = new EventEmitter();

  @Output() loadAll: EventEmitter<any> = new EventEmitter();

  @Output() onButtonClick = new EventEmitter<any>();

  @Output() onSelect = new EventEmitter<any>();

  @Output() onUnselect = new EventEmitter<any>();

  statuses: any[];

  optionsWidth = '6em';

  filters: any = {};

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.statuses = [
      { label: 'Selecciona...', value: null },
      { label: 'Activo', value: 'true' },
      { label: 'Inactivo', value: 'false' },
    ];
    this.optionsWidth =
      this.tableConfig?.optionButtons?.length < 2
        ? `${this.tableConfig?.optionButtons?.length * 5.5}em`
        : `${this.tableConfig?.optionButtons?.length * 4}em`;
    if (this.tableConfig?.lazy !== undefined) this.lazy = this.tableConfig.lazy;
  }

  calculareOptionsWidth(): string {
    return this.tableConfig?.optionButtons?.length < 2
      ? `${this.tableConfig?.optionButtons?.length * 5.5}em`
      : `${this.tableConfig?.optionButtons?.length * 4}em`;
  }

  contienePermisos(permisos: string[]): boolean {
    let result = true;
    if (permisos) {
      permisos.forEach(permiso => {
        result = result && this.permisos.includes(permiso);
      });
    }
    return result;
  }

  getValue(event) {
    return event.target.value;
  }

  loadEntitiesLazy(event: LazyLoadEvent) {
    const sort = [];
    this.filters = event.filters;
    event.multiSortMeta?.forEach(sortMeta => {
      sort.push({
        field: sortMeta.field,
        order: sortMeta.order < 0 ? 'desc' : 'asc',
      });
    });

    const filter = [];
    for (const [key, value] of Object.entries(event.filters)) {
      filter.push({ field: key, value: value.value });
    }

    this.requestFilter = {
      size: event.rows,
      page: event.first / event.rows,
      filter,
      sort,
    };

    this.requestFilterChange.emit(this.requestFilter);
    this.loadAll.emit();
  }

  buttonEvent(event: any) {
    this.onButtonClick.emit(event);
  }

  formatDate(date: Date, format: string): string {
    return this.datePipe.transform(date, format);
  }

  hasFilters(): boolean {
    let result = false;
    // eslint-disable-next-line no-return-assign
    this.tableConfig?.fieldConfig.forEach(fc => (result = result || fc.filter));
    return result;
  }

  onRowSelect(event) {
    this.onSelectionChange.emit(this.selection);
    this.onSelect.emit(event.data);
  }

  onRowUnselect(event) {
    this.onSelectionChange.emit(this.selection);
    this.onUnselect.emit(event.data);
  }

  byString(entity, string: string) {
    if (entity == null || entity === undefined) return entity;
    string = string.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    string = string.replace(/^\./, ''); // strip a leading dot
    const a = string.split('.');
    // eslint-disable-next-line no-plusplus
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in entity) {
        entity = entity[k];
      } else {
        // eslint-disable-next-line consistent-return
        return;
      }
    }
    return entity;
  }

  getObject(object, string1, string2) {
    const res = string1 + string2;
    return object[res];
  }
}
