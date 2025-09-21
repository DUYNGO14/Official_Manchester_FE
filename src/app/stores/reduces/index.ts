import { postReducer, postSlice } from '@/app/stores/reduces/posts';
import { authReducer, authSlice } from './auth';
import { notificationReducer, notificationSlice } from './notification';
import {combineReducers} from '@reduxjs/toolkit';
import { userReducer, userSlice } from '@/app/stores/reduces/user';

const rootReducer = combineReducers({
  [notificationSlice.name]: notificationReducer,
  [authSlice.name]: authReducer,
  [postSlice.name]: postReducer,
  [userSlice.name]: userReducer
});


export default rootReducer;