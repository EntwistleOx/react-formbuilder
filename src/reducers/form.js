import shortid from 'shortid';
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
    GET_ELEMENT,
    CLEAR_FORM,
    CREATE_FORM,
    LOAD_FORM
} from '../actions/types';

shortid.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
);

// TODO: 
// refactor required field in edit element
// put short id in utils file

const initial_state = {};

export default function (state = initial_state, action) {
    const { type, payload } = action;
    const uiOrderKey = "ui:order";

    switch (type) {
        case CLEAR_FORM:
            return {}

        case LOAD_FORM:
            return {
                ...state,
                schema: payload.schema,
                uiSchema: payload.uiSchema,
                formData: payload.formData,
            }

        case CREATE_FORM:
            return {
                ...state,
                schema: {
                    idPrefix: shortid.generate(),
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
            }

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
            const key = payload.formData.key ? payload.formData.key : undefined;
            const title = payload.formData.title ? payload.formData.title : undefined;
            const description = payload.formData.description ? payload.formData.description : undefined;

            const keys = payload.formData.options ? payload.formData.options.map((i) => i.key) : undefined;
            const values = payload.formData.options ? payload.formData.options.map((i) => i.value) : undefined;
            const items = payload.formData.items ? payload.formData.items : undefined;

            if (key === 'formRoot') {
                // Form Title & Description
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        title,
                        description
                    }
                };

            } else if (key === 'checkboxes') {
                // Checkboxes List
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

            } else if (key === 'radio') {
                // Radio Field
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: {
                                ...state.schema.properties[payload.id],
                                title: payload.formData.title,
                                enumNames: items
                            }
                        },
                        required: payload.formData.required === true ?
                            (
                                state.schema.required[stateIndex] ? [...state.schema.required] : [...state.schema.required, payload.id]
                            ) : (
                                state.schema.required.filter((item) => item !== payload.id))
                    }
                };

            } else if (key === 'paragraph') {
                // Paragraph
                return {
                    ...state,
                    schema: {
                        ...state.schema,
                        properties: {
                            ...state.schema.properties,
                            [payload.id]: {
                                ...state.schema.properties[payload.id],
                                description
                            }
                        }
                    }
                };

            } else if (key === 'select') {
                // Select List
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


