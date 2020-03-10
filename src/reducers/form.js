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
  ELEMENT_ERROR,
  GET_ELEMENT,
} from '../actions/types';
import { CustomObjectFieldTemplate } from '../components/CustomGroupedSchema';
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
    'ui:template': CustomObjectFieldTemplate,
    'ui:order': [],
    'ui:groups': [{
      'ui:template': 'well',
    }],
  },
  formData: {},
};

export default function (state = initial_state, action) {

  const { type, payload } = action;

  // Ui Schema Keys
  const uiOrderKey = 'ui:order';
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
          [uiTemplateKey]: CustomObjectFieldTemplate,
          [uiOrderKey]: [],
          [uiGroupsKey]: [{
            [uiTemplateKey]: 'well'
          }],
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
          [uiOrderKey]: [...state.uiSchema[uiOrderKey].filter(el => {
            for (const [index, group] of groups) {
              if (el === group) {
                return false
              }
            }
            return true
          })],
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
          [uiOrderKey]: [
            ...state.uiSchema[uiOrderKey],
            payload.id
          ],
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
          console.log(value[i])
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
          [uiOrderKey]: [...state.uiSchema[uiOrderKey].filter(el => el !== payload)],
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

    case GET_ELEMENT:
      return state.schema.properties[payload];

    case EDIT_ELEMENT:

      const id = payload.id;
      const context = payload.context;
      const title = payload.formData.title ? payload.formData.title : '';
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
      }

      else if (context === 'step') {
        // Step Title
        const keys = Object.keys(state.uiSchema[uiGroupsKey][0]);
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

    // else if (key === 'checkboxes') {
    //   // Checkboxes List
    //   return {
    //     ...state,
    //     json: [
    //       ...state.json.map((item, index) => {
    //         if (item.schema.idPrefix === payload.formData.formId) {
    //           return {
    //             ...item,
    //             schema: {
    //               ...item.schema,
    //               properties: {
    //                 ...item.schema.properties,
    //                 [payload.id]: {
    //                   ...item.schema.properties[payload.id],
    //                   title: payload.formData.title,
    //                   items: {
    //                     ...item.schema.properties[payload.id].items,
    //                     enum: items
    //                   }
    //                 }
    //               },
    //               required:
    //                 payload.formData.required === true
    //                   ? item.schema.required.find(req => req === payload.id)
    //                     ? [...item.schema.required]
    //                     : [...item.schema.required, payload.id]
    //                   : item.schema.required.filter(
    //                     item => item !== payload.id
    //                   )
    //             }
    //           };
    //         }
    //         return item;
    //       })
    //     ]
    //   };
    // } else if (key === 'radio') {
    //   // Radio Field
    //   return {
    //     ...state,
    //     json: [
    //       ...state.json.map((item, index) => {
    //         if (item.schema.idPrefix === payload.formData.formId) {
    //           return {
    //             ...item,
    //             schema: {
    //               ...item.schema,
    //               properties: {
    //                 ...item.schema.properties,
    //                 [payload.id]: {
    //                   ...item.schema.properties[payload.id],
    //                   title: payload.formData.title,
    //                   enumNames: items
    //                 }
    //               },
    //               required:
    //                 payload.formData.required === true
    //                   ? item.schema.required.find(req => req === payload.id)
    //                     ? [...item.schema.required]
    //                     : [...item.schema.required, payload.id]
    //                   : item.schema.required.filter(
    //                     item => item !== payload.id
    //                   )
    //             }
    //           };
    //         }
    //         return item;
    //       })
    //     ]
    //   };
    // } else if (key === 'paragraph') {
    //   // Paragraph
    //   return {
    //     ...state,
    //     json: [
    //       ...state.json.map((item, index) => {
    //         if (item.schema.idPrefix === payload.formData.formId) {
    //           return {
    //             ...item,
    //             schema: {
    //               ...item.schema,
    //               properties: {
    //                 ...item.schema.properties,
    //                 [payload.id]: {
    //                   ...item.schema.properties[payload.id],
    //                   description
    //                 }
    //               }
    //             }
    //           };
    //         }
    //         return item;
    //       })
    //     ]
    //   };
    // } else if (key === 'select') {
    //   // Select List
    //   return {
    //     ...state,
    //     json: [
    //       ...state.json.map((item, index) => {
    //         if (item.schema.idPrefix === payload.formData.formId) {
    //           return {
    //             ...item,
    //             schema: {
    //               ...item.schema,
    //               properties: {
    //                 ...item.schema.properties,
    //                 [payload.id]: {
    //                   ...item.schema.properties[payload.id],
    //                   title: payload.formData.title,
    //                   enum: keys,
    //                   enumNames: values
    //                 }
    //               },
    //               required:
    //                 payload.formData.required === true
    //                   ? item.schema.required.find(req => req === payload.id)
    //                     ? [...item.schema.required]
    //                     : [...item.schema.required, payload.id]
    //                   : item.schema.required.filter(
    //                     item => item !== payload.id
    //                   )
    //             }
    //           };
    //         }
    //         return item;
    //       })
    //     ]
    //   };
    // } else {
    //   // Other text fields and checkbox
    //   return {
    //     ...state,
    //     json: [
    //       ...state.json.map((item, index) => {
    //         if (item.schema.idPrefix === payload.formData.formId) {
    //           return {
    //             ...item,
    //             schema: {
    //               ...item.schema,
    //               properties: {
    //                 ...item.schema.properties,
    //                 [payload.id]: {
    //                   ...item.schema.properties[payload.id],
    //                   title: payload.formData.title
    //                 }
    //               },
    //               required:
    //                 payload.formData.required === true
    //                   ? item.schema.required.find(req => req === payload.id)
    //                     ? [...item.schema.required]
    //                     : [...item.schema.required, payload.id]
    //                   : item.schema.required.filter(
    //                     item => item !== payload.id
    //                   )
    //             }
    //           };
    //         }
    //         return item;
    //       })
    //     ]
    // };
    // }

    case ELEMENT_ERROR:

      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
}
