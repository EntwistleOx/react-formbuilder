import uuid from 'uuid/v4';
import { ADD_ELEMENT, MOVE_ELEMENT, DELETE_ELEMENT, ELEMENT_ERROR } from './types';

// add element to form
export const addElement = (newElement, newWidget) => dispatch => {
    const elementId = uuid();
    try {
        dispatch({
            type: ADD_ELEMENT,
            payload: { elementId, newElement, newWidget }
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
// move element, reorder element
export const moveElement = () => dispatch => {
    try {
        dispatch({
            type: MOVE_ELEMENT,
            payload: 'move ok'
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
export const deleteElement = () => dispatch => {
    try {
        dispatch({
            type: DELETE_ELEMENT,
            payload: 'delete ok'
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
