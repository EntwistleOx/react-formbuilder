import {
    ADD_ELEMENT,
    ADD_UI_ORDER,
    ADD_WIDGET,
    REORDER_ELEMENT,
    DELETE_ELEMENT,
    DELETE_UI_ORDER,
    DELETE_WIDGET,
    ELEMENT_ERROR
} from '../actions/types';

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
    const uiOrderKey = "ui:order";

    switch (type) {
        case ADD_ELEMENT:
            return {
                ...state,
                schema: {
                    ...state.schema,
                    properties: {
                        ...state.schema.properties,
                        [payload.id]: payload.newElement
                    }
                }
            };

        case ADD_UI_ORDER:
            return {
                ...state,
                uiSchema: {
                    ...state.uiSchema,
                    "ui:order": [
                        ...state.uiSchema[uiOrderKey],
                        payload.id
                    ]
                }
            };

        case ADD_WIDGET:
            return {
                ...state,
                uiSchema: {
                    ...state.uiSchema,
                    [payload.id]: payload.newWidget,
                }
            };

        case REORDER_ELEMENT:
            const result = state.uiSchema[uiOrderKey].slice();
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
            };
            delete newState.schema.properties[payload];
            return newState;

        case DELETE_UI_ORDER:
            return {
                ...state,
                uiSchema: {
                    ...state.uiSchema,
                    "ui:order": state.uiSchema[uiOrderKey].filter((item) => item !== payload)
                }
            };

        case DELETE_WIDGET:
            const newWidgetState = {
                ...state,
                uiSchema: {
                    ...state.uiSchema
                }
            };
            delete newWidgetState.uiSchema[payload];
            return newWidgetState;

        case ELEMENT_ERROR:
            return {
                ...state,
                error: payload,
            }
        default:
            return state;
    }
}


