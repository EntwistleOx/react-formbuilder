import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-jsonschema-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { setTemplate } from '../../actions/form';
import SchemaViewer from '../builder/schemaviewer/SchemaViewer';
import EmailAutocomplete from '../custom-widgets/EmailAutocomplete';
import axios from 'axios';
import * as Templates from '../GroupedRegistry';
import * as UiTemplate from '../UiTemplate';
import PropTypes from 'prop-types';

// TODO:
// move validation and error to external file
// email live formdata
// rellenar digito verificador esperado

const FormRender = ({ form, goBack, setAlert, setTemplate }) => {

  // const [stepsState, setStepsState] = useState({ step: 0, formData: {} });

  const [uiSchema, setUiSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://randomuser.me/api/?nat=es');

      setUser({
        name: result.data.results[0].name.first + ' ' + result.data.results[0].name.last,
        email: result.data.results[0].email,
        cell: result.data.results[0].cell,
        phone: result.data.results[0].phone
      });
    };

    fetchData();
    setTemplate('controlledTabs', 'normal');
  }, []);

  useEffect(() => {
    if (form.uiSchema['ui:groups'][0]['ui:template'] === 'controlledTabs') {
      setUiSchema(form.uiSchema)
    }
  }, [form.uiSchema['ui:groups'][0]['ui:template']]);

  function transformErrors(errors) {
    return errors.map(error => {
      if (error.name === 'required') {
        error.message = 'El campo es requerido.';
      }
      if (error.name === 'format') {
        error.message = 'El formato de correo esta incorrecto.';
      }
      return error;
    });
  }

  const validate = (formData, errors) => {
    // RUT validos
    //     10864629-2
    //     16158088-0
    //     23023518-k
    //     6709127-2

    // RUT invalidos
    //     10864629-1
    //     11726111-6
    //     16003145-0
    //     16158088-1

    function isRut(searchKey) {
      if (form.schema.properties[searchKey].key === 'rut') {
        return true;
      }
      return false;
    }

    Object.keys(formData).forEach(function (item) {
      const key = item;
      const val = formData[key];
      let isRutField = isRut(key);

      if (isRutField) {
        if (val === undefined) {
          return;
        }

        if (!val || val.trim().length < 3) {
          errors[key].addError('Rut invalido.');
          return;
        }

        const rutLimpio = val.replace(/[^0-9kK-]/g, '');

        if (rutLimpio.length < 3) {
          errors[key].addError('Rut invalido.');
          return;
        }

        const split = rutLimpio.split('-');

        if (split.length !== 2) {
          errors[key].addError('Rut invalido.');
          return;
        }

        const num = parseInt(split[0], 10);
        const dgv = split[1];

        function digitoVerificadorCalc() {
          const cuerpo = `${num}`;
          // Calcular Dígito Verificador
          let suma = 0;
          let multiplo = 2;

          // Para cada dígito del Cuerpo
          for (let i = 1; i <= cuerpo.length; i++) {
            // Obtener su Producto con el Múltiplo Correspondiente
            const index = multiplo * cuerpo.charAt(cuerpo.length - i);

            // Sumar al Contador General
            suma += index;

            // Consolidar Múltiplo dentro del rango [2,7]
            if (multiplo < 7) {
              multiplo += 1;
            } else {
              multiplo = 2;
            }
          }

          // Calcular Dígito Verificador en base al Módulo 11
          const dvEsperado = 11 - (suma % 11);
          if (dvEsperado === 10) return 'k';
          if (dvEsperado === 11) return '0';
          return dvEsperado;
        }

        let dvCalc = digitoVerificadorCalc();

        // console.log(dvCalc, dgv);
        if (dvCalc == dgv) {
          return errors;
        } else {
          errors[key].addError('Rut invalido.');
        }
      }
    });
    return errors;
  };

  const onSubmit = ({ formData }) => {
    setFormData(formData)
    setAlert('Formulario Valido.', 'success');
  };

  const onChange = ({ formData }) => {
    setFormData(formData)
  }

  const emailAutocomplete = {
    emailAutocompleteWidget: EmailAutocomplete
  };

  if ((Object.keys(form.schema.properties) && Object.keys(form.schema.properties).length < 1)) {
    return <Redirect to='/' />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', marginRight: '1rem' }}>
        <div className='page-header'>
          <h1>{form.schema.title}</h1>
        </div>
        <div className='panel panel-primary'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Datos del Cliente</h3>
          </div>
          <div className='panel-body'>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Celular: {user.cell}</p>
            <p>Telefono: {user.phone}</p>
          </div>
        </div>
        <Form
          schema={form.schema}
          uiSchema={uiSchema}
          formContext={{
            templates: Templates.GroupTemplates,
            schema: form
          }}
          {...UiTemplate}
          onSubmit={onSubmit}
          formData={formData}
          onChange={onChange}
          widgets={emailAutocomplete}
          transformErrors={transformErrors}
          validate={validate}
          // liveValidate={true}
          // showErrorList={false}
          noHtml5Validate={true}
        >
          <div></div>
        </Form>
        <hr />
        <Link to={goBack} className='btn btn-default'>
          Volver
        </Link>
      </div>
      <SchemaViewer form={formData} />
    </div>
  );
};

FormRender.propTypes = {
  form: PropTypes.object.isRequired,
  setTemplate: PropTypes.func.isRequired,
  goBack: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps, { setAlert, setTemplate })(FormRender);
