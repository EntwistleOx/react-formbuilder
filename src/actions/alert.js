import { SET_ALERT, REMOVE_ALERT } from './types';
import { getShortid } from '../utils/shortId';

export const setAlert = (msg, alertType, timeout = 1000) => dispatch => {
  const id = getShortid();
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
