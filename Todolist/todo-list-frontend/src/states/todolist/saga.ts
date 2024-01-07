import {AxiosResponse} from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {getErrorMessage} from '@/utils/error-handle';

import todolistKanbanSlice from './slice';
import {IGetTodolistPayloadAction} from './types';

function* getTodolist({payload}: IGetTodolistPayloadAction) {
  try {
    const response: AxiosResponse<ITodolistResponse, any> = yield call(() => api.todolist.getOne(payload));
    yield put(todolistKanbanSlice.actions.getTodolistSuccess(response.data));
  } catch (error) {
    yield put(todolistKanbanSlice.actions.getTodolistFailure(getErrorMessage(error)));
  }
}

export default function* kanbanSaga() {
  yield all([takeLatest(todolistKanbanSlice.actions.getTodolistRequest, getTodolist)]);
}
