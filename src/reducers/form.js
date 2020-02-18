import { ADD_ELEMENT, REORDER_ELEMENT, DELETE_ELEMENT, ELEMENT_ERROR } from '../actions/types';

// TODO: 
// add / delete formdata schema

const initial_state = {
    schema: {
        type: "object",
        title: "Titulo del Formulario",
        description: "Descripcion del Formulario.",
        properties: {}
    },
    uiSchema: {
        "ui:order": []
    },
    formData: {},
};

export default function (state = initial_state, action) {
    const { type, payload } = action;

    const key = "ui:order";

    switch (type) {
        case ADD_ELEMENT:
            let uiOrder = state.uiSchema[key].slice();
            uiOrder.splice(uiOrder.length, 0, payload.elementId);
            return {
                ...state,
                schema: {
                    ...state.schema,
                    properties: {
                        ...state.schema.properties,
                        [payload.elementId]: payload.newElement
                    }
                },
                uiSchema: {
                    ...state.uiSchema,
                    "ui:order": uiOrder
                }
            };

        case REORDER_ELEMENT:
            const result = state.uiSchema[key].slice();
            const [removed] = result.splice(payload.sourceIndex, 1);
            result.splice(payload.destinationIndex, 0, removed);

            return {
                ...state,
                uiSchema: {
                    ...state.uiSchema,
                    "ui:order": result
                }

            }

        case DELETE_ELEMENT:
            let oldUiOrder = state.uiSchema[key].slice();
            const newUiOrder = oldUiOrder.filter((item) => item !== payload);

            console.log('aers ', newUiOrder)
            const newState = {
                ...state,
                schema: {
                    ...state.schema,
                    properties: {
                        ...state.schema.properties
                    }
                },
                uiSchema: {
                    ...state.uiSchema,
                    "ui:order": newUiOrder
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


