import { combineReducers } from 'redux';
import forms from './forms';
import form from './form';
import alert from './alert';

export default combineReducers({
  forms,
  form,
  alert
});
