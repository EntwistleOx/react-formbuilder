import uuid from 'uuid/v4';
import { ADD_ELEMENT, REORDER_ELEMENT, DELETE_ELEMENT, ELEMENT_ERROR } from './types';

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

// reorder element
export const reorderElement = (sourceIndex, destinationIndex) => dispatch => {
    try {
        dispatch({
            type: REORDER_ELEMENT,
            payload: { sourceIndex, destinationIndex }
        });
    } catch (error) {
        console.log(error)
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
