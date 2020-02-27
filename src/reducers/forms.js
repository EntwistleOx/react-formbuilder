import {
  ADD_FORM,
  UPDATE_FORM,
  GET_FORM,
  DELETE_FORM,
  FORM_ERROR
} from '../actions/types';

const initial_state = [];

export default function (state = initial_state, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FORM:
      return [...state, payload.formData];
    case UPDATE_FORM:
      return state.map(form => {
        if (form.id === payload.formData.id) {
          return payload.formData;
        }
        return form;
      });
    case GET_FORM:
      return state.find(form => {
        if (form.id === payload) return true;
      });
    case DELETE_FORM:
      return state.filter(form => form.id !== payload);
    case FORM_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
