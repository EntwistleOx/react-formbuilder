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
            console.log(payload)
            return [...state, payload.formData];
        case GET_FORM:
            return state.find(form => form.schema.idPrefix === payload);
        case DELETE_FORM:
            return state.filter(form => form.schema.idPrefix !== payload);
        case FORM_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
}