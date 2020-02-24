import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { addForm, updateForm, clearForm, getForm } from '../../../actions/form';
import CanvasElementTemplate from './CanvasElementTemplate';
import { Droppable } from 'react-beautiful-dnd';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

const Canvas = props => {
  const { form, forms, createForm, addForm, updateForm, clearForm, setAlert } = props;

  let history = useHistory();

  const onSave = () => {
    const formExist = forms.find(item =>
      item.schema.idPrefix === form.schema.idPrefix ? true : false
    );

    if (formExist) {
      updateForm(form);
      setAlert('Formulario Actualizado.', 'success');
    } else {
      addForm(form);
      setAlert('Formulario Creado.', 'success');
    }
    clearForm();
    history.push(`/forms`);
  };

  return (
    <div id='formbuilder-canvas' >
      {
        form.map((form, index) =>
          (
            <Droppable key={form.schema.idPrefix} droppableId={form.schema.idPrefix} type='builder'>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  <div className='form-wrap'>
                    {form.schema && Object.keys(form.schema).length > 0 ? (
                      <Form
                        schema={form.schema}
                        uiSchema={form.uiSchema}
                        // formData={form.formData}
                        // FieldTemplate={CanvasElementTemplate}
                        disabled={true}
                      >
                        {Object.keys(form.schema.properties).length < 1 ? (
                          <Fragment>
                            <div className='notice'>
                              Arrastra los elementos del menu aca
                       </div>
                          </Fragment>
                        ) : (
                            ''
                          )}
                        <hr />
                        <div className='form-buttons'>
                          <Link to='/formbuilder-render' className='btn btn-default'>
                            Probar
                     </Link>
                          <button
                            type='button'
                            className='btn btn-success'
                            onClick={onSave}
                          >
                            Guardar
                     </button>
                        </div>
                      </Form>
                    ) : (
                        <Fragment>
                          <div className='notice'>
                            Arrastra los elementos del menu aca...
                   </div>
                        </Fragment>
                      )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          )
        )
      }
    </div>
  );
};

Canvas.propTypes = {
  form: PropTypes.array.isRequired,
  forms: PropTypes.array.isRequired,
  addForm: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  forms: state.forms
});

export default connect(mapStateToProps, {
  addForm,
  updateForm,
  clearForm,
  getForm,
  setAlert
})(Canvas);
