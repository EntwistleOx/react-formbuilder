import React, { Fragment } from 'react';
import Form from 'react-jsonschema-form';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { addForm, updateForm, clearForm, getForm } from '../../../actions/form';
import * as Templates from '../../GroupedRegistry';
import * as UiTemplate from '../../UiTemplate';
import CustomFieldTemplate from '../../FieldTemplate';
import EmailAutocomplete from '../../custom-widgets/EmailAutocomplete';
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
    <div id='formbuilder-canvas'>
      <div /*className='form-wrap'*/>
        <div
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
            // disabled={true}
            // widgets={emailAutocomplete}
            formContext={{
              templates: Templates.GroupTemplates,
              fnClearForm: clearForm
            }}
            {...UiTemplate}
            FieldTemplate={CustomFieldTemplate}
          >
            {Object.keys(form.uiSchema['ui:groups'][0]).length === 1 && (
              <Fragment>
                <div className='notice'>Debes agregar un paso para comenzar</div>
              </Fragment>
            )}
            <div className='form-buttons bottom-buttons'>
              <Link to='/formbuilder-render' className='btn btn-default'>
                Probar
                  </Link>
              <button type='button' className='btn btn-success' onClick={onSave}>
                Guardar
                  </button>
            </div>
          </Form>
        </div>
      </div>
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
