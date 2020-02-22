import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import Form from 'react-jsonschema-form';
import JSONPretty from 'react-json-prettify';
import PropTypes from 'prop-types';

const FormRender = ({ form, goBack, setAlert }) => {
  const [renderState, setRenderState] = useState({});

  useEffect(() => {
    setRenderState(form);
  }, []);

  function transformErrors(errors) {
    return errors.map(error => {
      if (error.name === 'required') {
        error.message = 'El campo es requerido.';
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

    Object.keys(formData).forEach(function(item) {
      const key = item;
      const val = formData[item];

      if (renderState && renderState.schema.properties[item].key === 'rut') {
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

        console.log(dvCalc, dgv);
        if (dvCalc == dgv) {
          return errors;
        } else {
          errors[key].addError('Rut invalido.');
        }
      }
    });
    return errors;
  };

  const onSubmit = formData => {
    setAlert('Formulario Valido.', 'success');
    console.log(formData);
  };

  if ((Object.keys(form) && Object.keys(form).length < 1) || form.error) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <Form
        schema={renderState.schema ? renderState.schema : {}}
        uiSchema={renderState.uiSchema ? renderState.uiSchema : {}}
        onSubmit={onSubmit}
        // formData={formSchema.formData}
        // liveValidate={true}
        transformErrors={transformErrors}
        validate={validate}
        showErrorList={false}
        noHtml5Validate={true}
      >
        <div className='form-buttons'>
          <Link to={goBack} className='btn btn-default'>
            Volver
          </Link>
          <button type='submit' className='btn btn-success'>
            Validar
          </button>
        </div>
      </Form>
      {/* <JSONPretty json={formData} /> */}
    </Fragment>
  );
};

FormRender.propTypes = {
  form: PropTypes.object.isRequired,
  goBack: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps, { setAlert })(FormRender);
