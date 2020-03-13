import { getShortid } from '../../../utils/shortId';

// Toolkit Schema
const toolkitSchema = [
  {
    id: getShortid(),
    key: 'checkbox',
    name: 'Checkbox',
    type: 'boolean',
    default: false,
    icon: 'fas fa-check',
    required: true
  },
  {
    id: getShortid(),
    key: 'checkboxes',
    name: 'Checkboxes',
    type: 'array',
    default: false,
    icon: 'fas fa-check-double',
    items: {
      type: 'string',
      enum: ['option 1', 'option 2', 'option 3', 'option 4']
    },
    uniqueItems: true
  },
  {
    id: getShortid(),
    key: 'email',
    name: 'Email',
    type: 'string',
    format: 'email',
    icon: 'fas fa-at',
    required: true
  },
  {
    id: getShortid(),
    key: 'date',
    name: 'Fecha',
    type: 'string',
    format: 'date',
    icon: 'fas fa-calendar-alt',
    required: true
  },
  {
    id: getShortid(),
    key: 'number',
    name: 'Number',
    type: 'number',
    icon: 'fa-stack fa-1x number-icon',
    required: true
  },
  {
    id: getShortid(),
    key: 'paragraph',
    name: 'Parrafo',
    type: 'null',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit.Quod vero magnam quibusdam assumenda, voluptatem quo quos perferendis totam consequatur voluptates.',
    required: false,
    icon: 'fas fa-paragraph'
  },
  {
    id: getShortid(),
    key: 'radio',
    name: 'Radio',
    type: 'boolean',
    default: false,
    icon: 'fas fa-dot-circle',
    required: true,
    enumNames: ['Opcion Si', 'Opcion No']
  },
  {
    id: getShortid(),
    key: 'rut',
    name: 'Rut',
    type: 'string',
    icon: 'fa-stack rut-icon',
    required: true
  },
  {
    id: getShortid(),
    key: 'select',
    name: 'Select',
    type: 'string',
    enum: ['opcion1', 'opcion2'],
    enumNames: ['Opcion 1', 'Opcion 2'],
    icon: 'fas fa-angle-down',
    required: true
  },
  {
    id: getShortid(),
    key: 'textarea',
    name: 'Textarea',
    type: 'string',
    icon: 'fa-stack textarea-icon',
    required: true
  },
  {
    id: getShortid(),
    key: 'text',
    name: 'Texto',
    type: 'string',
    icon: 'fas fa-font',
    required: true
  }
];

export default toolkitSchema;
