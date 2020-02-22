import {
  CREATE_FORM,
  ADD_ELEMENT,
  ADD_UI_ORDER,
  ADD_WIDGET,
  REORDER_ELEMENT,
  DELETE_ELEMENT,
  DELETE_UI_ORDER,
  DELETE_WIDGET,
  ELEMENT_ERROR,
  EDIT_ELEMENT,
  GET_ELEMENT,
  CLEAR_FORM,
  ADD_FORM,
  UPDATE_FORM,
  DELETE_FORM,
  LOAD_FORM,
  GET_FORM
} from './types';

// clear form builder
export const clearForm = () => dispatch => {
  dispatch({ type: CLEAR_FORM });
};

// clear form builder
export const createForm = () => dispatch => {
  dispatch({ type: CREATE_FORM });
};

// add a form
export const addForm = formData => dispatch => {
  try {
    dispatch({
      type: ADD_FORM,
      payload: { formData }
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// update a form
export const updateForm = formData => dispatch => {
  try {
    dispatch({
      type: UPDATE_FORM,
      payload: { formData }
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// get form
export const loadForm = form => dispatch => {
  try {
    dispatch({
      type: LOAD_FORM,
      payload: form
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error,
        status: error
      }
    });
  }
};

// delete form
export const deleteForm = id => dispatch => {
  try {
    dispatch({
      type: DELETE_FORM,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// add element to form
export const addElement = (id, newElement) => dispatch => {
  try {
    dispatch({
      type: ADD_ELEMENT,
      payload: { id, newElement }
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// add element order in ui schema
export const addUiOrder = (id, newElement) => dispatch => {
  try {
    dispatch({
      type: ADD_UI_ORDER,
      payload: { id, newElement }
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// add new widget if any
export const addWidget = (id, newWidget) => dispatch => {
  try {
    dispatch({
      type: ADD_WIDGET,
      payload: { id, newWidget }
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// reorder element
export const reorderElement = (sourceIndex, destinationIndex) => dispatch => {
  try {
    dispatch({
      type: REORDER_ELEMENT,
      payload: { sourceIndex, destinationIndex }
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// delete element
export const deleteElement = id => dispatch => {
  try {
    dispatch({
      type: DELETE_ELEMENT,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// delete ui order
export const deleteUiOrder = id => dispatch => {
  try {
    dispatch({
      type: DELETE_UI_ORDER,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// get element by id
export const getElement = id => dispatch => {
  try {
    dispatch({
      type: GET_ELEMENT,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error,
        status: error
      }
    });
  }
};

// search form by id
export const getForm = id => dispatch => {
  try {
    dispatch({
      type: GET_FORM,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error,
        status: error
      }
    });
  }
};

// edit element
export const editElement = (id, formData) => dispatch => {
  try {
    dispatch({
      type: EDIT_ELEMENT,
      payload: { id, formData }
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// delete widget
export const deleteWidget = id => dispatch => {
  try {
    dispatch({
      type: DELETE_WIDGET,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
