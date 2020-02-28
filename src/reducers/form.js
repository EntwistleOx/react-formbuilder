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
  LOAD_FORM,
  DELETE_FORM_ELEMENT
} from '../actions/types';

shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
);

// TODO:
// refactor required field in edit element
// put short id in utils file
// add id, title, description

const initial_state = {
  id: shortid.generate(),
  title: 'Titulo del Formulario',
  description: '',
  json: []
};

export default function (state = initial_state, action) {
  const { type, payload } = action;
  const uiOrderKey = 'ui:order';

  switch (type) {
    case CLEAR_FORM:
      return {
        id: shortid.generate(),
        title: 'Titulo del Formulario',
        description: '',
        json: []
      };

    case LOAD_FORM:
      return payload;

    case CREATE_FORM:
      return {
        ...state,
        json: [
          ...state.json,
          {
            schema: {
              idPrefix: shortid.generate(),
              title: 'Titulo',
              description: '',
              type: 'object',
              required: [],
              properties: {}
            },
            uiSchema: {
              'ui:order': []
            },
            formData: {}
          }
        ]
      };

    case ADD_ELEMENT:
      if (payload.newElement.type === 'null') {
        // Paragraph element
        return {
          ...state,
          json: [
            ...state.json.map((item, index) => {
              if (item.schema.idPrefix === payload.destination.droppableId) {
                return {
                  ...item,
                  schema: {
                    ...item.schema,
                    properties: {
                      ...item.schema.properties,
                      [payload.id]: payload.newElement
                    }
                  }
                };
              }
              return item;
            })
          ]
        };
      } else {
        // All other form elements
        return {
          ...state,
          json: [
            ...state.json.map((item, index) => {
              if (item.schema.idPrefix === payload.destination.droppableId) {
                return {
                  ...item,
                  schema: {
                    ...item.schema,
                    properties: {
                      ...item.schema.properties,
                      [payload.id]: payload.newElement
                    },
                    required: [...item.schema.required, payload.id]
                  }
                };
              }
              return item;
            })
          ]
        };
      }

    case ADD_UI_ORDER:
      return {
        ...state,
        json: [
          ...state.json.map((item, index) => {
            if (item.schema.idPrefix === payload.destination.droppableId) {
              return {
                ...item,
                uiSchema: {
                  ...item.uiSchema,
                  'ui:order': [...item.uiSchema[uiOrderKey], payload.id]
                }
              };
            }
            return item;
          })
        ]
      };

    case ADD_WIDGET:
      return {
        ...state,
        json: [
          ...state.json.map((item, index) => {
            if (item.schema.idPrefix === payload.destination.droppableId) {
              return {
                ...item,
                uiSchema: {
                  ...item.uiSchema,
                  [payload.id]: payload.newWidget
                }
              };
            }
            return item;
          })
        ]
      };

    case REORDER_ELEMENT:
      return {
        ...state,
        json: [
          ...state.json.map((item, index) => {
            if (item.schema.idPrefix === payload.destination.droppableId) {
              const result = item.uiSchema[uiOrderKey].slice();
              const [removed] = result.splice(payload.sourceIndex, 1);
              result.splice(payload.destinationIndex, 0, removed);

              return {
                ...item,
                uiSchema: {
                  ...item.uiSchema,
                  'ui:order': result
                }
              };
            }
            return item;
          })
        ]
      };

    case DELETE_ELEMENT:
      return {
        ...state,
        json: [
          ...state.json.map((item, index) => {
            if (item.schema.idPrefix === payload.form) {
              const newState = {
                ...item,
                schema: {
                  ...item.schema,
                  properties: {
                    ...item.schema.properties
                  },
                  required: item.schema.required.filter(
                    item => item !== payload.id
                  )
                }
              };
              delete newState.schema.properties[payload.id];
              return newState;
            }
            return item;
          })
        ]
      };

    case DELETE_UI_ORDER:
      return {
        ...state,
        json: [
          ...state.json.map((item, index) => {
            if (item.schema.idPrefix === payload.form) {
              console.log(item.schema.idPrefix, payload.form);
              return {
                ...item,
                uiSchema: {
                  ...item.uiSchema,
                  'ui:order': item.uiSchema[uiOrderKey].filter(
                    item => item !== payload.id
                  )
                }
              };
            }
            return item;
          })
        ]
      };

    case DELETE_WIDGET:
      return {
        ...state,
        json: [
          ...state.json.map((item, index) => {
            if (item.schema.idPrefix === payload.form) {
              const newWidgetState = {
                ...item,
                uiSchema: {
                  ...item.uiSchema
                }
              };
              delete newWidgetState.uiSchema[payload.id];
              return newWidgetState;
            }
            return item;
          })
        ]
      };

    case DELETE_FORM_ELEMENT:
      return {
        ...state,
        json: [...state.json.filter(form => form.schema.idPrefix !== payload)]
      };

    case GET_ELEMENT:
      return state.schema.properties[payload];

    case EDIT_ELEMENT:
      const key = payload.formData.key ? payload.formData.key : undefined;
      const root = payload.formData.root ? payload.formData.root : undefined;
      const formId = payload.formData.formId
        ? payload.formData.formId
        : undefined;
      const title = payload.formData.title ? payload.formData.title : '';
      const description = payload.formData.description
        ? payload.formData.description
        : '';
      const keys = payload.formData.options
        ? payload.formData.options.map(i => i.key)
        : undefined;
      const values = payload.formData.options
        ? payload.formData.options.map(i => i.value)
        : undefined;
      const items = payload.formData.items ? payload.formData.items : undefined;

      // return {
      //     ...state,
      //     json: [

      //     ]
      // }

      console.log(payload);

      if (formId === 'title' && root === 'root') {
        // Form Title
        return {
          ...state,
          title
        };
      } else if (formId === 'title' && root !== 'root') {
        console.log('aca title');
        // Form Title
        return {
          ...state,
          json: [
            ...state.json.map((item, index) => {
              if (item.schema.idPrefix === payload.id) {
                return {
                  ...item,
                  schema: {
                    ...item.schema,
                    title
                    // description
                  }
                };
              }
              return item;
            })
          ]
        };
      } else if (key === 'checkboxes') {
        // Checkboxes List
        return {
          ...state,
          json: [
            ...state.json.map((item, index) => {
              if (item.schema.idPrefix === payload.formData.formId) {
                return {
                  ...item,
                  schema: {
                    ...item.schema,
                    properties: {
                      ...item.schema.properties,
                      [payload.id]: {
                        ...item.schema.properties[payload.id],
                        title: payload.formData.title,
                        items: {
                          ...item.schema.properties[payload.id].items,
                          enum: items
                        }
                      }
                    },
                    required:
                      payload.formData.required === true
                        ? item.schema.required.find(req => req === payload.id)
                          ? [...item.schema.required]
                          : [...item.schema.required, payload.id]
                        : item.schema.required.filter(
                          item => item !== payload.id
                        )
                  }
                };
              }
              return item;
            })
          ]
        };
      } else if (key === 'radio') {
        // Radio Field
        return {
          ...state,
          json: [
            ...state.json.map((item, index) => {
              if (item.schema.idPrefix === payload.formData.formId) {
                return {
                  ...item,
                  schema: {
                    ...item.schema,
                    properties: {
                      ...item.schema.properties,
                      [payload.id]: {
                        ...item.schema.properties[payload.id],
                        title: payload.formData.title,
                        enumNames: items
                      }
                    },
                    required:
                      payload.formData.required === true
                        ? item.schema.required.find(req => req === payload.id)
                          ? [...item.schema.required]
                          : [...item.schema.required, payload.id]
                        : item.schema.required.filter(
                          item => item !== payload.id
                        )
                  }
                };
              }
              return item;
            })
          ]
        };
      } else if (key === 'paragraph') {
        // Paragraph
        return {
          ...state,
          json: [
            ...state.json.map((item, index) => {
              if (item.schema.idPrefix === payload.formData.formId) {
                return {
                  ...item,
                  schema: {
                    ...item.schema,
                    properties: {
                      ...item.schema.properties,
                      [payload.id]: {
                        ...item.schema.properties[payload.id],
                        description
                      }
                    }
                  }
                };
              }
              return item;
            })
          ]
        };
      } else if (key === 'select') {
        // Select List
        return {
          ...state,
          json: [
            ...state.json.map((item, index) => {
              if (item.schema.idPrefix === payload.formData.formId) {
                return {
                  ...item,
                  schema: {
                    ...item.schema,
                    properties: {
                      ...item.schema.properties,
                      [payload.id]: {
                        ...item.schema.properties[payload.id],
                        title: payload.formData.title,
                        enum: keys,
                        enumNames: values
                      }
                    },
                    required:
                      payload.formData.required === true
                        ? item.schema.required.find(req => req === payload.id)
                          ? [...item.schema.required]
                          : [...item.schema.required, payload.id]
                        : item.schema.required.filter(
                          item => item !== payload.id
                        )
                  }
                };
              }
              return item;
            })
          ]
        };
      } else {
        // Other text fields and checkbox
        return {
          ...state,
          json: [
            ...state.json.map((item, index) => {
              if (item.schema.idPrefix === payload.formData.formId) {
                return {
                  ...item,
                  schema: {
                    ...item.schema,
                    properties: {
                      ...item.schema.properties,
                      [payload.id]: {
                        ...item.schema.properties[payload.id],
                        title: payload.formData.title
                      }
                    },
                    required:
                      payload.formData.required === true
                        ? item.schema.required.find(req => req === payload.id)
                          ? [...item.schema.required]
                          : [...item.schema.required, payload.id]
                        : item.schema.required.filter(
                          item => item !== payload.id
                        )
                  }
                };
              }
              return item;
            })
          ]
        };
      }

    case ELEMENT_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
