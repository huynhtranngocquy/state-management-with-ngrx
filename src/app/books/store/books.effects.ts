import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { BooksService } from '../books.service';
import {
  booksFetchAPISuccess,
  deleteBookAPISuccess,
  invokeBooksAPI,
  invokeDeleteBookAPI,
  invokeSaveBookAPI,
  invokeUpdateBookAPI,
  saveBookAPISuccess,
  updateBookAPISuccess,
} from './books.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private bookService: BooksService,
    private appStore: Store<Appstate>,
    private store: Store
  ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([, booksfromStore]) => {
        if (booksfromStore.length > 0) {
          return EMPTY;
        }
        return this.bookService
          .get()
          .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.create(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );

            return saveBookAPISuccess({ response: data });
          })
        );
      })
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.update(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );

            return updateBookAPISuccess({ response: data });
          })
        );
      })
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.delete(action.id).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );

            return deleteBookAPISuccess({ id: action.id });
          })
        );
      })
    )
  );
}
