import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { addForm, updateForm, clearForm, getForm } from '../../../actions/form';
// import CanvasElementTemplate from './CanvasElementTemplate';
import FieldTemplate from './FieldTemplate';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import EmailAutocomplete from '../../custom-widgets/EmailAutocomplete';
import { Droppable } from 'react-beautiful-dnd';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

const Canvas = props => {
  const { form, forms, addForm, updateForm, clearForm, setAlert } = props;

  let history = useHistory();

  const onSave = () => {
    // if form exist update, if not create
    const formExist = forms.find(item => (item.id === form.id ? true : false));

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

  const emailAutocomplete = {
    emailAutocompleteWidget: EmailAutocomplete
  };

  return (
    <div id='formbuilder-canvas' className='well'>
      <div className='form-wrap'>
        {form.json.length > 0 ? (
          <div
            className='page-header'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginTop: '-1rem'
            }}
          >
            <h2>{form.title}</h2>
            <div style={{ display: 'flex', fontSize: '15px' }}>
              <Link to={`/formbuilder/root/title/${form.id}/`}>
                <i className='fas fa-edit'></i>
              </Link>
              <Link to='#!'>
                <i onClick={() => clearForm()} className='fas fa-trash-alt'></i>
              </Link>
            </div>
          </div>
        ) : (
          <Fragment>
            <div className='notice'>Debes agregar un paso para comenzar</div>
          </Fragment>
        )}
        {form.json.map((form, index) => (
          <Droppable
            key={form.schema.idPrefix}
            droppableId={form.schema.idPrefix}
            type='builder'
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className='well'
                style={{
                  border: '1px solid #cccccc',
                  backgroundColor: 'rgb(248, 248, 248)',
                  boxShadow: 'none'
                }}
              >
                <Form
                  schema={form.schema}
                  uiSchema={form.uiSchema}
                  formData={form.formData}
                  // FieldTemplate={CanvasElementTemplate}
                  FieldTemplate={FieldTemplate}
                  ObjectFieldTemplate={ObjectFieldTemplate}
                  formContext={form.schema}
                  disabled={true}
                  widgets={emailAutocomplete}
                  // safeRenderCompletion={true}
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

                  <div className='form-buttons'>
                    <button type='button' className='btn btn-primary btn-sm'>
                      Anterior
                    </button>
                    <button type='button' className='btn btn-primary btn-sm'>
                      Siguiente
                    </button>
                  </div>
                </Form>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
      {form.json.length > 0 && (
        <div className='form-buttons bottom-buttons'>
          <Link to='/formbuilder-render' className='btn btn-default'>
            Probar
          </Link>
          <button type='button' className='btn btn-success' onClick={onSave}>
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

Canvas.propTypes = {
  form: PropTypes.object.isRequired,
  forms: PropTypes.array.isRequired,
  addForm: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired
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
