import { createAction, props } from '@ngrx/store';
import { Book } from './book';

export const invokeBooksAPI = createAction(
  '[Books API] invoke books Fetch API'
);

export const booksFetchAPISuccess = createAction(
  '[Book API] books fetch api success',
  props<{ allBooks: Book[] }>()
);

export const invokeSaveBookAPI = createAction(
  '[Book API] invoke save book API',
  props<{ payload: Book }>()
);

export const saveBookAPISuccess = createAction(
  '[Book API] save book api success',
  props<{ response: Book }>()
);

export const invokeUpdateBookAPI = createAction(
  '[Book API] invoke update book API',
  props<{ payload: Book }>()
);

export const updateBookAPISuccess = createAction(
  '[Book API] update book API success',
  props<{ response: Book }>()
);

export const invokeDeleteBookAPI = createAction(
  '[Book API] invoke delete book API',
  props<{ id: number }>()
);

export const deleteBookAPISuccess = createAction(
  '[Book API] delete book API success',
  props<{ id: number }>()
);
