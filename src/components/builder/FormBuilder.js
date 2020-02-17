import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addElement, reorderElement } from '../../actions/form';
import { DragDropContext } from 'react-beautiful-dnd';
import ToolKit from './toolkit/Toolkit';
import Canvas from './canvas/Canvas';
import PropTypes from 'prop-types';
import toolkitSchema from './toolkit/toolkitSchema';

const Formbuilder = ({ addElement, reorderElement }) => {

    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case 'Canvas':
                reorderElement(source.index, destination.index)
                break;
            case 'ToolkitItems':

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

                // Radio, Select and Textarea fields need to set a new uiState
                const key = toolkitSchema[source.index].key
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

                addElement(newElement, newWidget());
                break;
            default:
                break;
        }
    };

    return (
        <Fragment>
            <h2>Builder</h2>
            <div id="formbuilder" className="container">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Canvas />
                    <ToolKit toolkitSchema={toolkitSchema} />
                </DragDropContext>
            </div>
        </Fragment>
    )
};

Formbuilder.propTypes = {
    addElement: PropTypes.func.isRequired,
    reorderElement: PropTypes.func.isRequired,
};

export default connect(null, { addElement, reorderElement })(Formbuilder);
