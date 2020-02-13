import React, { useState, Fragment } from 'react';
import uuid from 'uuid/v4';
import { DragDropContext } from 'react-beautiful-dnd';
import ToolKit from './toolkit/Toolkit';
import Canvas from './canvas/Canvas';
// import PropTypes from 'prop-types';

import toolkitSchema from './toolkit/toolkitSchema';


//TODO:
// Add move button in toolkit
// SET STATE WITH MOVE AND REORDER FUNCTIONS

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
            "properties": {}
        }
    );

    const [uiState, setUiState] = useState({});

    const [formDataState, setFormDataState] = useState({});

    console.log(schemaState)
    console.log(uiState)
    console.log(formDataState)

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
                const newElementId = uuid();

                // All fields
                const title = toolkitSchema[source.index].name
                const type = toolkitSchema[source.index].type

                // Radio, Checkbox
                const defaultVal = toolkitSchema[source.index].default

                // Date, Email
                const format = toolkitSchema[source.index].format

                // Paragraph
                const description = toolkitSchema[source.index].description

                // Select
                const enumVal = toolkitSchema[source.index].enum
                const enumNames = toolkitSchema[source.index].enumNames

                // Create a new object depending if values exists
                const newElement = {
                    ...(title && { title }),
                    ...(type && { type }),
                    ...(format && { format }),
                    ...(description && { description }),
                    ...(defaultVal && { default: defaultVal }),
                    ...(format && { format }),
                    ...(enumVal && { enum: enumVal }),
                    ...(enumNames && { enumNames })
                }

                setSchemaState(
                    {
                        ...schemaState,
                        properties: {
                            ...schemaState.properties,
                            [newElementId]: newElement
                        }
                    }
                );

                // Radio, Select and Textarea fields need to set a new uiState
                const key = toolkitSchema[source.index].key
                if (key === 'select' || key === 'radio' || key === 'textarea') {
                    const newWidget = () => {
                        switch (key) {
                            case 'select':
                                return { "ui:placeholder": "Seleciona" }
                            case 'radio':
                                return { "ui:widget": "radio" }
                            case 'textarea':
                                return { "ui:widget": "textarea" }
                            default:
                                break;
                        }
                    };

                    setUiState({
                        ...uiState,
                        [newElementId]: newWidget()
                    });
                };

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
