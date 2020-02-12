import React, { Fragment } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CanvasElementTemplate from './CanvasElementTemplate'
import Form from "react-jsonschema-form";
import PropTypes from 'prop-types';

// TODO:
// Style borders on drag action

const Canvas = ({ schema, uiSchema }) => {
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

                            {schema.properties ?
                                (
                                    <Form schema={schema} uiSchema={uiSchema} FieldTemplate={CanvasElementTemplate} disabled={true}>
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
}

export default Canvas
