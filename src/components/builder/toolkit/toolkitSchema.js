import uuid from 'uuid/v4';

// Toolkit Schema
const toolkitSchema = [
    {
        id: uuid(),
        key: 'checkbox',
        name: 'Checkbox',
        type: 'boolean',
        icon: 'fas fa-check-square',
    },
    {
        id: uuid(),
        key: 'email',
        name: 'Email',
        icon: 'fas fa-at',
    },
    {
        id: uuid(),
        key: 'date',
        name: 'Fecha',
        icon: 'fas fa-calendar-alt'
    },
    {
        id: uuid(),
        key: 'number',
        name: 'Number',
        icon: 'fa-stack fa-1x number-icon'
    },
    {
        id: uuid(),
        key: 'paragraph',
        name: 'Parrafo',
        icon: 'fas fa-paragraph'
    },
    {
        id: uuid(),
        key: 'radio',
        name: 'Radio',
        icon: 'fas fa-dot-circle'
    },
    {
        id: uuid(),
        key: 'select',
        name: 'Select',
        icon: 'fas fa-angle-down'
    },
    {
        id: uuid(),
        key: 'textarea',
        name: 'Textarea',
        icon: 'fa-stack textarea-icon'
    },
    {
        id: uuid(),
        key: 'text',
        name: 'Texto',
        icon: 'fas fa-font'
    },
];

export default toolkitSchema;