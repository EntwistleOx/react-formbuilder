import React, { useState, Fragment } from 'react';
import uuid from 'uuid/v4';
import { DragDropContext } from 'react-beautiful-dnd';
import ToolKit from './toolkit/Toolkit';
import Canvas from './canvas/Canvas';
// import PropTypes from 'prop-types';

import toolkitSchema from './toolkit/toolkitSchema';


//TODO:
// SET STATE WITH COPY, MOVE AND REORDER FUNCTIONS



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
    // const sourceClone = Array.from(source);
    // const destClone = Array.from(destination);
    // const item = sourceClone[droppableSource.index];
    // destClone.splice(destination.index, 0, { ...item, id: uuid() });

    console.log(source[droppableSource.index].id)
    console.log(source[droppableSource.index].key)
    console.log(source[droppableSource.index].name)

    console.log(destination)
    destination.properties = {
        [uuid()]: {
            "title": source[droppableSource.index].name,
            "type": source[droppableSource.index].type
        }
    }
    return destination;
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



const Formbuilder = props => {
    const [schemaState, setSchemaState] = useState(
        {
            "title": "Titulo del Formulario",
            "description": "Descripcion del Formulario.",
            "type": "object",
            "required": [],
            "properties": {
                "checkbox": {
                    "type": "boolean",
                    "title": " Checkbox",
                    "default": false
                },
            }
        }
    );

    const [uiState, setUiState] = useState(
        {
            "radio": {
                "ui:widget": "radio"
            },
            "select": {
                "ui:placeholder": "Seleciona"
            },
            "textarea": {
                "ui:widget": "textarea"
            },
        }
    );

    const [formDataState, setFormDataState] = useState({});

    // console.log(schemaState)
    console.log(schemaState)
    // console.log(uiState)
    // console.log(formDataState)

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
                setSchemaState({
                    [destination.droppableId]: reorder(
                        schemaState[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ToolkitItems':

                setSchemaState(
                    {
                        ...schemaState.properties,
                        [uuid()]: {
                            "title": null,
                            "type": null
                        }

                    }
                    // copy(
                    //     toolkitSchema,
                    //     schemaState,
                    //     source,
                    //     destination)

                );

                break;
            default:
                setSchemaState(
                    move(
                        schemaState[source.droppableId],
                        schemaState[destination.droppableId],
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
                    <Canvas schema={schemaState} uiSchema={uiState} formData={formDataState} />
                    <ToolKit toolkitSchema={toolkitSchema} />
                </DragDropContext>
            </div>
        </Fragment>
    )
};

Formbuilder.propTypes = {

}

export default Formbuilder
