import { postReducer, postSlice } from '@/app/stores/reduces/posts';
import { authReducer, authSlice } from './auth';
import { notificationReducer, notificationSlice } from './notification';
import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [notificationSlice.name]: notificationReducer,
  [authSlice.name]: authReducer,
  [postSlice.name]: postReducer
});


export default rootReducer;