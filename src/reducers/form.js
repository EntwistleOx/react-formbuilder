import { ADD_ELEMENT, REORDER_ELEMENT, DELETE_ELEMENT, ELEMENT_ERROR } from '../actions/types';

// TODO: 
// REORDER!!!!!!!!!!
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
        case REORDER_ELEMENT:

            const reorderState = Object.entries(state.schema.properties);
            const [removed] = reorderState.splice(payload.sourceIndex, 1);
            reorderState.splice(payload.destinationIndex, 0, removed);
            const newOrder = Object.fromEntries(reorderState)
            return {
                ...state,
                schema: {
                    ...state.schema,
                    properties: {
                        ...newOrder
                    }
                }
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


