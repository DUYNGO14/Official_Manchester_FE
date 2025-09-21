import userSaga from './users';
import authSaga from './auth';
import postsSaga from './posts';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), postsSaga(), userSaga()]);
}