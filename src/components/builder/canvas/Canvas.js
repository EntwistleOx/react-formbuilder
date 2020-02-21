import React, { Fragment } from 'react';
import CanvasElementTemplate from './CanvasElementTemplate';
import { addForm, updateForm, clearForm } from '../../../actions/form';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Form from "react-jsonschema-form";
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// TODO:
// onSave must add a form OR update form


const Canvas = (props) => {

    const { form, addForm, updateForm, clearForm, action } = props;

    let history = useHistory();

    const onSave = () => {
        if (action === 'add') {
            console.log('add')
            addForm(form);
        } else {
            console.log('upodate')
            updateForm(form);
        }
        clearForm()
        history.push(`/forms`);
    }

    return (
        <Droppable key="Canvas" droppableId="Canvas" type="builder">
            {(provided, snapshot) => (
                <div id="formbuilder-canvas" ref={provided.innerRef}>
                    <div className="form-wrap">
                        {form.schema &&
                            Object.keys(form.schema).length > 0 ?
                            (
                                <Form
                                    schema={form.schema}
                                    uiSchema={form.uiSchema}
                                    // formData={form.formData}
                                    FieldTemplate={CanvasElementTemplate}
                                    disabled={true}
                                >
                                    {
                                        Object.keys(form.schema.properties).length < 1 ? (
                                            <Fragment>
                                                <div className="notice">
                                                    Arrastra los elementos del menu aca
                                                </div>
                                            </Fragment>
                                        ) : ''
                                    }
                                    <hr />
                                    <div className='form-buttons'>
                                        <Link to='/formbuilder-render' className="btn btn-default">Probar</Link>
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
    form: PropTypes.object.isRequired,
    addForm: PropTypes.func.isRequired,
    updateForm: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
}

export default connect(null, { addForm, updateForm, clearForm })(Canvas);