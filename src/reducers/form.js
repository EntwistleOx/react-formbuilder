import shortid from 'shortid';
import {
  LOAD_FORM,
  CLEAR_FORM,
  CREATE_STEP,
  DELETE_STEP,
  ADD_ELEMENT,
  DELETE_ELEMENT,
  EDIT_ELEMENT,
  REORDER_ELEMENT,
  MOVE_ELEMENT,
  ELEMENT_ERROR,
  GET_ELEMENT,
  SET_TEMPLATE,
} from '../actions/types';

import { CustomObjectFieldTemplate } from '../components/CustomGroupedSchema'
import { ObjectFieldTemplate } from "../components/GroupedSchema";

shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
);

// TODO:
// put short id in utils file
// delete from array using splice

const initial_state = {
  id: shortid.generate(),
  schema: {
    type: 'object',
    title: 'Titulo del Formulario',
    properties: {},
    required: []
  },
  uiSchema: {
    'ui:groups': [{
      'ui:template': '',
    }],
    'ui:template': '',
  },
  formData: {},
};

export default function (state = initial_state, action) {

  const { type, payload } = action;

  // Ui Schema Keys
  const uiGroupsKey = 'ui:groups';
  const uiTemplateKey = 'ui:template';

  switch (type) {
    case CLEAR_FORM:
      return {
        id: shortid.generate(),
        schema: {
          type: 'object',
          title: 'Titulo del Formulario',
          properties: {},
          required: []
        },
        uiSchema: {
          [uiGroupsKey]: [{
            [uiTemplateKey]: ''
          }],
          [uiTemplateKey]: '',
        },
        formData: {},
      };

    case LOAD_FORM:
      return payload;

    case CREATE_STEP:
      return {
        ...state,
        uiSchema: {
          ...state.uiSchema,
          [uiGroupsKey]: [
            {
              ...state.uiSchema[uiGroupsKey][0],
              [`Paso_${shortid.generate()}`]: []
            }
          ]
        }
      };

    case DELETE_STEP:

      const groups = Object.entries(state.uiSchema[uiGroupsKey][0][payload.id]);

      const newStepState = {
        ...state,
        schema: {
          ...state.schema,
          properties: {
            ...state.schema.properties
          },
          required: [...state.schema.required.filter(el => {
            for (const [index, group] of groups) {
              if (el === group) {
                return false
              }
            }
            return true
          })]
        },
        uiSchema: {
          ...state.uiSchema,
          [uiGroupsKey]: [
            {
              ...state.uiSchema[uiGroupsKey][0]
            }
          ]
        }
      };

      for (const [index, group] of groups) {
        delete newStepState.schema.properties[group];
        delete newStepState.uiSchema[group];
      };
      delete newStepState.uiSchema[uiGroupsKey][0][payload.id];

      return newStepState;

    case ADD_ELEMENT:

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
            ...(payload.newElement.type !== 'null') ? [payload.id] : ''
          ]
        },
        uiSchema: {
          ...state.uiSchema,
          ...(payload.newWidget) && { [payload.id]: payload.newWidget },
          [uiGroupsKey]: [
            {
              ...state.uiSchema[uiGroupsKey][0],
              [payload.destination.droppableId]: [
                ...state.uiSchema[uiGroupsKey][0][payload.destination.droppableId],
                payload.id
              ]
            }
          ]
        }
      };

    case DELETE_ELEMENT:

      // Search the step where element is located
      let stepId = ''
      for (let [key, value] of Object.entries(state.uiSchema[uiGroupsKey][0])) {
        for (let i = 0; i < value.length; i++) {
          if (value[i] === payload) {
            stepId = key
          }
        }
      }

      const newElementsState = {
        ...state,
        schema: {
          ...state.schema,
          properties: {
            ...state.schema.properties
          },
          required: [...state.schema.required.filter(el => el !== payload)]
        },
        uiSchema: {
          ...state.uiSchema,
          [uiGroupsKey]: [
            {
              ...state.uiSchema[uiGroupsKey][0],
              [stepId]: [...state.uiSchema[uiGroupsKey][0][stepId].filter(el => el !== payload)],
            }
          ]
        }
      };
      delete newElementsState.schema.properties[payload];
      delete newElementsState.uiSchema[payload];

      return newElementsState;

    case REORDER_ELEMENT:

      const result = state.uiSchema[uiGroupsKey][0][payload.destination.droppableId].slice();
      const [removed] = result.splice(payload.sourceIndex, 1);
      result.splice(payload.destinationIndex, 0, removed);

      return {
        ...state,
        uiSchema: {
          ...state.uiSchema,
          [uiGroupsKey]: [
            {
              ...state.uiSchema[uiGroupsKey][0],
              [payload.destination.droppableId]: result
            }
          ]
        }
      };

    case MOVE_ELEMENT:

      const sourceClone = state.uiSchema[uiGroupsKey][0][payload.source.droppableId].slice();
      const destClone = state.uiSchema[uiGroupsKey][0][payload.destination.droppableId].slice();
      const [rremoved] = sourceClone.splice(payload.source.index, 1);
      destClone.splice(payload.destination.index, 0, rremoved);

      return {
        ...state,
        uiSchema: {
          ...state.uiSchema,
          [uiGroupsKey]: [
            {
              ...state.uiSchema[uiGroupsKey][0],
              [payload.source.droppableId]: sourceClone,
              [payload.destination.droppableId]: destClone

            }
          ]
        }
      };

    case GET_ELEMENT:
      return state.schema.properties[payload];

    case SET_TEMPLATE:
      return {
        ...state,
        uiSchema: {
          ...state.uiSchema,
          [uiGroupsKey]: [
            {
              ...state.uiSchema[uiGroupsKey][0],
              ['ui:template']: payload.type
            }
          ],
          ['ui:template']: payload.template === 'custom' ? CustomObjectFieldTemplate : ObjectFieldTemplate
        }
      };

    case EDIT_ELEMENT:
      const id = payload.id;
      const context = payload.context;
      const key = payload.formData.key ? payload.formData.key : '';
      const title = payload.formData.title ? payload.formData.title : '';
      const description = payload.formData.description ? payload.formData.description : '';
      const keys = payload.formData.options ? payload.formData.options.map(i => i.key) : undefined;
      const values = payload.formData.options ? payload.formData.options.map(i => i.value) : undefined;
      const items = payload.formData.items ? payload.formData.items : undefined;

      if (context === 'form') {
        // Form Title
        return {
          ...state,
          schema: {
            ...state.schema,
            title
          }
        };
      } else if (context === 'step') {
        // Step Title

        // Get object keys to array
        const keys = Object.keys(state.uiSchema[uiGroupsKey][0]);

        // Change array key name
        const newUiGroup = keys.reduce((acc, val) => {
          if (val === id) {
            acc[title] = state.uiSchema[uiGroupsKey][0][id];
          }
          else {
            acc[val] = state.uiSchema[uiGroupsKey][0][val];
          }
          return acc;
        }, {});

        return {
          ...state,
          uiSchema: {
            ...state.uiSchema,
            [uiGroupsKey]: [
              newUiGroup
            ]
          }
        };
      }

      else if (key === 'checkboxes') {
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
            required:
              payload.formData.required === true
                ? state.schema.required.find(req => req === payload.id)
                  ? [...state.schema.required]
                  : [...state.schema.required, payload.id]
                : state.schema.required.filter(
                  state => state !== payload.id
                )
          }
        };
      }

      else if (key === 'radio') {
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
            required:
              payload.formData.required === true
                ? state.schema.required.find(req => req === payload.id)
                  ? [...state.schema.required]
                  : [...state.schema.required, payload.id]
                : state.schema.required.filter(
                  state => state !== payload.id
                )
          }
        };
      }

      else if (key === 'paragraph') {
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
      }

      else if (key === 'select') {
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
                enumNames: values
              }
            },
            required:
              payload.formData.required === true
                ? state.schema.required.find(req => req === payload.id)
                  ? [...state.schema.required]
                  : [...state.schema.required, payload.id]
                : state.schema.required.filter(
                  state => state !== payload.id
                )
          }
        };
      }

      else {
        // Other text fields and checkbox
        return {
          ...state,
          schema: {
            ...state.schema,
            properties: {
              ...state.schema.properties,
              [payload.id]: {
                ...state.schema.properties[payload.id],
                title: payload.formData.title
              }
            },
            required:
              payload.formData.required === true
                ? state.schema.required.find(req => req === payload.id)
                  ? [...state.schema.required]
                  : [...state.schema.required, payload.id]
                : state.schema.required.filter(
                  state => state !== payload.id
                )
          }
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
