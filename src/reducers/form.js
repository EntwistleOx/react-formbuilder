import { ADD_ELEMENT, REORDER_ELEMENT, DELETE_ELEMENT, ELEMENT_ERROR } from '../actions/types';

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

            let order = state.uiSchema[key].slice()
            order.splice(order.length, 0, payload.elementId)

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
                    "ui:order": order
                }
            };

        case REORDER_ELEMENT:

            const result = state.uiSchema[key].slice();
            console.log(result)
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


