/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { CommonService } from '@app/shared/services/common.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { Page } from 'src/app/shared/models/page';

export abstract class CommonEffect<T> {
  constructor(
    protected actions$: Actions,
    protected actions: any,
    protected service: CommonService<T>,
  ) {}

  loadAllEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.loadAllEntities),
      exhaustMap(() =>
        this.service.getAllEntities().pipe(
          map((page: T[]) => this.actions.loadAllEntitiesSuccess({ payload: page })),
          catchError(err => of(this.actions.loadAllEntitiesFail({ error: err }))),
        ),
      ),
    ),
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.loadAll),
      map(action => action.payload),
      exhaustMap(requestFilter =>
        this.service.getAll(requestFilter).pipe(
          map((page: Page<T>) => this.actions.loadAllSuccess({ payload: page })),
          catchError(err => of(this.actions.loadAllFail({ error: err }))),
        ),
      ),
    ),
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.loadOne),
      mergeMap(action =>
        this.service.getOne(action.id).pipe(
          map((item: T) => this.actions.loadOneSuccess({ payload: item })),
          catchError(err => of(this.actions.loadOneFail({ error: err }))),
        ),
      ),
    ),
  );

  createOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.create),
      mergeMap(action =>
        this.service.create(action.payload).pipe(
          map((item: T) => this.actions.createSuccess({ payload: item })),
          catchError(err => of(this.actions.createFail({ error: err }))),
        ),
      ),
    ),
  );

  updateOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.update),
      mergeMap(action =>
        this.service.update(action.payload).pipe(
          map((item: T) => {
            const _item = item as unknown as any;
            return this.actions.updateSuccess({
              payload: { id: _item.id, changes: item },
            });
          }),
          catchError(err => of(this.actions.updateFail({ error: err }))),
        ),
      ),
    ),
  );

  deleteOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.delete),
      mergeMap(action =>
        this.service.delete(action.id).pipe(
          map(() => this.actions.deleteSuccess({ id: action.id })),
          catchError(err => of(this.actions.deleteFail({ error: err }))),
        ),
      ),
    ),
  );

  count$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.count),
      mergeMap(() =>
        this.service.count().pipe(
          map((count: number) => this.actions.countSuccess({ payload: count })),
          catchError(err => of(this.actions.countFail({ error: err }))),
        ),
      ),
    ),
  );
}
