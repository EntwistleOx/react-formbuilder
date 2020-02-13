import { ADD_ELEMENT, MOVE_ELEMENT, DELETE_ELEMENT, ELEMENT_ERROR } from '../actions/types';

// TODO: 
// add / delete ui schema
// add / delete formdata schema

const initial_state = {
    schema: {
        type: "object",
        title: "Titulo del Formulario",
        description: "Descripcion del Formulario.",
        properties: {}
    },
    uiSchema: {},
    formData: {},
};

export default function (state = initial_state, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_ELEMENT:
            return {
                ...state,
                schema: {
                    ...state.schema,
                    properties: {
                        ...state.schema.properties,
                        [payload.elementId]: payload.newElement
                    }
                }
            }
        case MOVE_ELEMENT:
            return {
                ...state
            }
        case DELETE_ELEMENT:
            const newState = {
                ...state,
                schema: {
                    ...state.schema,
                    properties: {
                        ...state.schema.properties
                    }
                }
            }
            delete newState.schema.properties[payload];
            return newState;

        case ELEMENT_ERROR:
            return {
                ...state,
                error: payload,
            }
        default:
            return state;
    }
}


