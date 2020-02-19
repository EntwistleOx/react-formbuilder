import {
    ADD_ELEMENT,
    ADD_UI_ORDER,
    ADD_WIDGET,
    REORDER_ELEMENT,
    DELETE_ELEMENT,
    DELETE_UI_ORDER,
    DELETE_WIDGET,
    EDIT_ELEMENT,
    ELEMENT_ERROR,
    GET_ELEMENT
} from '../actions/types';

// TODO: 
// refactor required field in edit element


const initial_state = {
    schema: {
        // "$id": "Form", -> stop the validation if schema change
        title: "Titulo del Formulario",
        description: "Descripcion del Formulario.",
        type: "object",
        required: [],
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

    // formdata initial states:
    // checkbox -> false
    // checkboxes -> []
    // email -> undefined
    // number, date -> ''

    switch (type) {
        case ADD_ELEMENT:
            if (payload.newElement.type === 'null') {
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: payload.newElement
                        },
                    },
                };
            } else {
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: payload.newElement
                        },
                        required: [
                            ...state.schema.required,
                            payload.id
                        ]
                    },
                };
            }

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
            };

        case DELETE_ELEMENT:
            const newState = {
                ...state,
                schema: {
                    ...state.schema,
                    properties: {
                        ...state.schema.properties
                    },
                    required: state.schema.required.filter((item) => item !== payload)
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

        case GET_ELEMENT:
            return state.schema.properties[payload];

        case EDIT_ELEMENT:
            const stateIndex = state.schema.required.findIndex(element => element === payload.id);
            const keys = payload.formData.options ? payload.formData.options.map((i) => i.key) : undefined;
            const values = payload.formData.options ? payload.formData.options.map((i) => i.value) : undefined;
            const items = payload.formData.items ? payload.formData.items : undefined;
            const radioItems = payload.formData.radioItems ? payload.formData.radioItems : undefined;
            const description = payload.formData.description ? payload.formData.description : undefined;

            if (items !== undefined) {
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: {
                                ...state.schema.properties[payload.id],
                                title: payload.formData.title,
                                items: {
                                    ...state.schema.properties[payload.id].items,
                                    enum: items
                                }
                            }
                        },
                        required: payload.formData.required === true ?
                            (
                                state.schema.required[stateIndex] ? [...state.schema.required] : [...state.schema.required, payload.id]
                            ) : (
                                state.schema.required.filter((item) => item !== payload.id))
                    }
                };

            } else if (radioItems !== undefined) {
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: {
                                ...state.schema.properties[payload.id],
                                title: payload.formData.title,
                                enumNames: radioItems
                            }
                        },
                        required: payload.formData.required === true ?
                            (
                                state.schema.required[stateIndex] ? [...state.schema.required] : [...state.schema.required, payload.id]
                            ) : (
                                state.schema.required.filter((item) => item !== payload.id))
                    }
                };

            } else if (description !== undefined) {
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: {
                                ...state.schema.properties[payload.id],
                                title: payload.formData.title,
                                description
                            }
                        },
                        required: payload.formData.required === true ?
                            (
                                state.schema.required[stateIndex] ? [...state.schema.required] : [...state.schema.required, payload.id]
                            ) : (
                                state.schema.required.filter((item) => item !== payload.id))
                    }
                };

            } else if (keys !== undefined && values !== undefined) {
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: {
                                ...state.schema.properties[payload.id],
                                title: payload.formData.title,
                                enum: keys,
                                enumNames: values,
                            }
                        },
                        required: payload.formData.required === true ?
                            (
                                state.schema.required[stateIndex] ? [...state.schema.required] : [...state.schema.required, payload.id]
                            ) : (
                                state.schema.required.filter((item) => item !== payload.id))
                    }
                };

            } else {
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: {
                                ...state.schema.properties[payload.id],
                                title: payload.formData.title,
                            }
                        },
                        required: payload.formData.required === true ?
                            (
                                state.schema.required[stateIndex] ? [...state.schema.required] : [...state.schema.required, payload.id]
                            ) : (
                                state.schema.required.filter((item) => item !== payload.id))
                    }
                };
            };

        case ELEMENT_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
}


