import uuid from 'uuid/v4';

// Toolkit Schema
const toolkitSchema = [
    {
        id: uuid(),
        key: 'checkbox',
        name: 'Checkbox',
        type: 'boolean',
        default: false,
        icon: 'fas fa-check-square',
    },
    {
        id: uuid(),
        key: 'email',
        name: 'Email',
        type: 'string',
        format: 'email',
        icon: 'fas fa-at',
    },
    {
        id: uuid(),
        key: 'date',
        name: 'Fecha',
        type: 'string',
        format: 'date',
        icon: 'fas fa-calendar-alt'
    },
    {
        id: uuid(),
        key: 'number',
        name: 'Number',
        type: 'number',
        icon: 'fa-stack fa-1x number-icon'
    },
    {
        id: uuid(),
        key: 'paragraph',
        name: 'Parrafo',
        type: 'null',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.Quod vero magnam quibusdam assumenda, voluptatem quo quos perferendis totam consequatur voluptates.',
        icon: 'fas fa-paragraph'
    },
    {
        id: uuid(),
        key: 'radio',
        name: 'Radio',
        type: 'boolean',
        default: false,
        icon: 'fas fa-dot-circle'
    },
    {
        id: uuid(),
        key: 'select',
        name: 'Select',
        type: 'string',
        enum: [
            'opcion1',
            'opcion2'
        ],
        enumNames: [
            'Opcion 1',
            'Opcion 2'
        ],
        icon: 'fas fa-angle-down'
    },
    {
        id: uuid(),
        key: 'textarea',
        name: 'Textarea',
        type: 'string',
        icon: 'fa-stack textarea-icon'
    },
    {
        id: uuid(),
        key: 'text',
        name: 'Texto',
        type: 'string',
        icon: 'fas fa-font'
    },
];

export default toolkitSchema;