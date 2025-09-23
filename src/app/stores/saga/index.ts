import userSaga from './users';
import authSaga from './auth';
import postsSaga from './posts';
import { all } from 'redux-saga/effects';
import playerSaga from '@/app/stores/saga/player';

export default function* rootSaga() {
  yield all([authSaga(), postsSaga(), userSaga(), playerSaga()]);
}