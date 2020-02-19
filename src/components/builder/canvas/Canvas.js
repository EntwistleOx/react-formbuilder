import React, { Fragment } from 'react';
import CanvasElementTemplate from './CanvasElementTemplate'
// import ObjectFieldTemplate from './ObjectFieldTemplate'
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Form from "react-jsonschema-form";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// TODO:
// Edit option on form title
// Edit option on form description

const Canvas = ({ formSchema }) => {

    const onSave = () => {
        console.log(formSchema)
    }

    return (
        <Droppable key="Canvas" droppableId="Canvas" type="builder">
            {(provided, snapshot) => (
                <div id="formbuilder-canvas" ref={provided.innerRef}>
                    <div className="form-wrap">

                        {formSchema.schema.properties &&
                            Object.keys(formSchema.schema.properties).length > 0 ?
                            (
                                <Form
                                    schema={formSchema.schema}
                                    uiSchema={formSchema.uiSchema}
                                    // formData={formSchema.formData}
                                    // ObjectFieldTemplate={ObjectFieldTemplate}
                                    FieldTemplate={CanvasElementTemplate}
                                    disabled={true}
                                >
                                    <div className='form-buttons'>
                                        <Link to='/formrender' className="btn btn-info">Probar</Link>
                                        {/* <button type="button" className="btn btn-info" onClick={onClick}>Probar</button> */}

                                        <button type="button" className="btn btn-success" onClick={onSave}>Guardar</button>
                                    </div>

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
    formSchema: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    formSchema: state.form,
})

export default connect(mapStateToProps)(Canvas);