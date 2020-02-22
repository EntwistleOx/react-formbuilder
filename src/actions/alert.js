import { SET_ALERT, REMOVE_ALERT } from './types';
import shortid from 'shortid';
shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
);

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = shortid.generate();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    timeout
  );
};
