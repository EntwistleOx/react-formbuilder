import React, { Fragment } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CanvasElementTemplate from './CanvasElementTemplate'
import Form from "react-jsonschema-form";
import PropTypes from 'prop-types';

// TODO:
// Edit option on form title
// Edit option on form description
// Style borders on drag action

const Canvas = ({ schema, uiSchema, formData }) => {
    return (
        <Droppable key="Canvas" droppableId="Canvas">
            {(provided, snapshot) => (
                <div id="formbuilder-canvas">
                    <div className="form-wrap">
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {schema.properties &&
                                Object.keys(schema.properties).length > 0 ?
                                (
                                    <Form
                                        schema={schema}
                                        uiSchema={uiSchema}
                                        formData={formData}
                                        FieldTemplate={CanvasElementTemplate}
                                        disabled={true}
                                    >
                                        <div></div>
                                    </Form>
                                )
                                : (
                                    <Fragment>
                                        <div className="notice">
                                            Arrastra los elementos del menu aca
                                            </div>
                                    </Fragment>
                                )}
                            {provided.placeholder}
                        </div>
                    </div>
                </div>
            )}
        </Droppable>
    )
}

Canvas.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.object,
}

export default Canvas
