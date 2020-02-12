import React, { useState, Fragment } from 'react';
import uuid from 'uuid/v4';
import { DragDropContext } from 'react-beautiful-dnd';
import ToolKit from './toolkit/Toolkit';
import Canvas from './canvas/Canvas';
// import PropTypes from 'prop-types';

// TODO:
// REVISAR PORQUE AGREGAR CANVAS AL ESTADO COMO INDICE

// HELPER FUNCTIONS FOR DRAG AND DROP
/** 
 * Reorder the result
 */
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};
// FINISH HELPER FUNCTIONS

// Toolkit Elements
const ToolkitElements = [
    {
        id: uuid(),
        key: 'checkbox',
        name: 'Checkbox',
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

const schema =
{
    "title": "Form Elements",
    "description": "List All Elements.",
    "type": "object",
    "required": [
        "text"
    ],
    "properties": {
        "checkbox": {
            "type": "boolean",
            "title": " Checkbox",
            "default": false
        },
        "email": {
            "type": "string",
            "format": "email",
            "title": "Email",
        },
        "date": {
            "type": "string",
            "title": "Fecha",
            "format": "date"
        },
        "number": {
            "type": "number",
            "title": "Numero"
        },
        "paragraph": {
            "title": "Parrafo",
            "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Quod vero magnam quibusdam assumenda, voluptatem quo quos perferendis totam consequatur voluptates.",
            "type": "null"
        },
        "radio": {
            "type": "boolean",
            "title": "Radio"
        },
        "select": {
            "title": "Select",
            "type": "string",
            "enum": [
                "foo",
                "bar"
            ],
            "enumNames": [
                "Foo",
                "Bar"
            ]
        },
        "textarea": {
            "type": "string",
            "title": "Textarea"
        },
        "text": {
            "type": "string",
            "title": "Texto"
        },
    }
};

const ui = {
    "radio": {
        "ui:widget": "radio"
    },
    "select": {
        "ui:placeholder": "Seleciona"
    },
    "textarea": {
        "ui:widget": "textarea"
    },

};

const Formbuilder = props => {
    const [schemaState, setSchemaState] = useState(
        [schema]
    );

    const [formState, setFormState] = useState(
        [schema]
    );

    console.log(formState)

    const onDragEnd = result => {
        const { source, destination } = result;

        // console.log('==> result', result);
        // console.log(source, destination);

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                setFormState({
                    [destination.droppableId]: reorder(
                        formState[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ToolkitItems':
                setFormState({
                    [destination.droppableId]: copy(
                        ToolkitElements,
                        formState[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                setFormState(
                    move(
                        formState[source.droppableId],
                        formState[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };

    return (
        <Fragment>
            <h2>Builder</h2>
            <div id="formbuilder" className="container">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Canvas schema={schema} ui={ui} />
                    <ToolKit toolkitElements={ToolkitElements} />
                </DragDropContext>
            </div>
        </Fragment>
    )
};

Formbuilder.propTypes = {

}

export default Formbuilder
