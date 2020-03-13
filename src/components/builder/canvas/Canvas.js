import React, { useEffect, Fragment } from 'react';
import Form from 'react-jsonschema-form';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { addForm, updateForm, clearForm, getForm, deleteStep, deleteElement, setTemplate } from '../../../actions/form';
import * as Templates from '../../layouts/templates/GroupedRegistry';
import * as UiTemplate from '../../layouts/templates/UiTemplate';
import CustomFieldTemplate from '../../layouts/templates/FieldTemplate';
import EmailAutocomplete from '../../custom-widgets/EmailAutocomplete';
import PropTypes from 'prop-types';

const Canvas = props => {
  const { form, forms, addForm, updateForm, clearForm, setAlert, deleteStep, deleteElement, setTemplate } = props;

  useEffect(() => {
    // Excecuted on first render
    setTemplate('well', 'custom');
  }, [])

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
      <div
        className='well'
      >
        <Form
          schema={form.schema}
          uiSchema={form.uiSchema}
          disabled={true}
          formContext={{
            templates: Templates.GroupTemplates,
            schema: form,
            fnClearForm: clearForm,
            fnDeleteStep: deleteStep,
            fnDeleteElement: deleteElement,
            fnSetTemplate: setTemplate,
          }}
          {...UiTemplate}
          FieldTemplate={CustomFieldTemplate}
          widgets={emailAutocomplete}
        >
          {Object.keys(form.uiSchema['ui:groups'][0]).length === 1 && (
            <Fragment>
              <div className="panel panel-default text-center panel-notice">
                <div className="panel-body text-muted">
                  Debes agregar un paso para comenzar
                  </div>
              </div>
            </Fragment>
          )}
          <div className='form-buttons bottom-buttons'>
            <Link to='/formbuilder-render' className='btn btn-default'>
              Probar
            </Link>
            <button type='button' className='btn btn-primary' onClick={onSave}>
              Guardar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

Canvas.propTypes = {
  form: PropTypes.object.isRequired,
  forms: PropTypes.array.isRequired,
  addForm: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired,
  deleteElement: PropTypes.func.isRequired,
  setTemplate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  forms: state.forms
});

export default connect(mapStateToProps, {
  addForm,
  updateForm,
  clearForm,
  getForm,
  setAlert,
  deleteStep,
  deleteElement,
  setTemplate
})(Canvas);
