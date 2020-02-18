import React, { Fragment } from 'react';
import CanvasElementTemplate from './CanvasElementTemplate'
import ObjectFieldTemplate from './ObjectFieldTemplate'
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Form from "react-jsonschema-form";
import PropTypes from 'prop-types';

// TODO:
// Edit option on form title
// Edit option on form description

const Canvas = ({ schema, uiSchema, formData }) => {
    return (
        <Droppable key="Canvas" droppableId="Canvas" type="builder">
            {(provided, snapshot) => (
                <div id="formbuilder-canvas" ref={provided.innerRef}>
                    <div className="form-wrap">

                        {schema.properties &&
                            Object.keys(schema.properties).length > 0 ?
                            (
                                <Form
                                    schema={schema}
                                    uiSchema={uiSchema}
                                    formData={formData}
                                    // ObjectFieldTemplate={ObjectFieldTemplate}
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
            )}
        </Droppable>
    )
}

Canvas.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData
})

export default connect(mapStateToProps)(Canvas);