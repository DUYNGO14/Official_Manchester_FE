import { combineReducers } from '@reduxjs/toolkit';
import { authReducer, authSlice } from './auth';
import { notificationReducer, notificationSlice } from './notification';
import { playerReducer, playerSlice } from './player';
import { postReducer, postSlice } from './posts';
import { userReducer, userSlice } from './user';

const rootReducer = combineReducers({
  [notificationSlice.name]: notificationReducer,
  [authSlice.name]: authReducer,
  [postSlice.name]: postReducer,
  [userSlice.name]: userReducer,
  [playerSlice.name]: playerReducer
});


export default rootReducer;