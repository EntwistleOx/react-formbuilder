import React from 'react';
import uuid from 'uuid/v4';
import { DragDropContext } from 'react-beautiful-dnd';
import ToolKit from './toolkit/Toolkit';
// import PropTypes from 'prop-types';

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
    console.log('==> dest', destination);
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
        key: 'button',
        name: 'Boton',
        icon: 'far fa-square',

    },
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
        key: 'submit',
        name: 'Submit',
        icon: 'fas fa-paper-plane'
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

const Formbuilder = props => {

    const onDragEnd = result => {
        const { source, destination } = result;

        console.log('==> result', result);

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                this.setState({
                    [destination.droppableId]: reorder(
                        this.state[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                this.setState({
                    [destination.droppableId]: copy(
                        ToolkitElements,
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                this.setState(
                    move(
                        this.state[source.droppableId],
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };

    return (
        <div id="formbuilder" class="container">
            <DragDropContext onDragEnd={onDragEnd}>
                <ToolKit toolkitElements={ToolkitElements} />
            </DragDropContext>
        </div>
    )
};

Formbuilder.propTypes = {

}

export default Formbuilder
