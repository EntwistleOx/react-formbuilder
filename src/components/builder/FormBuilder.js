import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addElement, addUiOrder, addWidget, reorderElement } from '../../actions/form';
import { DragDropContext } from 'react-beautiful-dnd';
import ToolKit from './toolkit/Toolkit';
import Canvas from './canvas/Canvas';
import PropTypes from 'prop-types';
import toolkitSchema from './toolkit/toolkitSchema';
import uuid from 'uuid/v4';

// TODO:
// Maybe add placeholders in toolkit objects

const Formbuilder = ({ addElement, addUiOrder, addWidget, reorderElement }) => {

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

                // Checkboxes
                const items = toolkitSchema[source.index].items
                const uniqueItems = toolkitSchema[source.index].uniqueItems

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
                    ...(enumNames && { enumNames }),
                    ...(items && { items }),
                    ...(uniqueItems && { uniqueItems })
                }

                // Radio, Select and Textarea fields need to set a new uiState
                const key = toolkitSchema[source.index].key
                const newWidget = () => {
                    switch (key) {
                        case 'select':
                            return { "ui:placeholder": "...seleciona" }
                        case 'text':
                            return { "ui:placeholder": "...campo de texto" }
                        case 'number':
                            return { "ui:placeholder": "...12345" }
                        case 'email':
                            return { "ui:placeholder": "...my@email.cl" }
                        case 'radio':
                            return { "ui:widget": "radio" }
                        case 'textarea':
                            return { "ui:widget": "textarea", "ui:placeholder": "...area de texto" }
                        case 'checkboxes':
                            return { "ui:widget": "checkboxes" }
                        default:
                            break;
                    }
                };

                const id = uuid();
                addElement(id, newElement);
                addUiOrder(id, newElement);
                if (newWidget()) {
                    addWidget(id, newWidget());
                }
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
    addUiOrder: PropTypes.func.isRequired,
    addWidget: PropTypes.func.isRequired,
    reorderElement: PropTypes.func.isRequired,
};

export default connect(null, { addElement, addUiOrder, addWidget, reorderElement })(Formbuilder);
