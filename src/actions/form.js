import {
    ADD_ELEMENT,
    ADD_UI_ORDER,
    ADD_WIDGET,
    REORDER_ELEMENT,
    DELETE_ELEMENT,
    ELEMENT_ERROR
} from './types';

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
}

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
}

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
}

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
}

// delete element
export const deleteElement = (id) => dispatch => {
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
}
