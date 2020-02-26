import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import SchemaViewer from '../builder/schemaviewer/SchemaViewer';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

// TODO:
// move validation and error sfunction to external file

const FormRender = ({ forms, goBack, setAlert }) => {

  const [stepsState, setStepsState] = useState({ step: 0, formData: {} })

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
      for (let i = 0; i < forms.length; ++i) {
        for (let j = 0; j < Object.keys(forms[i].schema.properties).length; j++) {
          if (Object.keys(forms[i].schema.properties)[j] === searchKey) {
            if (forms[i].schema.properties[searchKey].key === 'rut') {
              return true;
            }
          }
        }
      }
      return false;
    }

    Object.keys(formData).forEach(function (item) {
      const key = item;
      const val = formData[key];
      let isRutField = isRut(key)

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
    let index = 0
    for (index; index <= forms.length - 1; index++) {
      if (stepsState.step === index) {
        setStepsState({
          step: index < forms.length - 1 ? index + 1 : index,
          formData: {
            ...stepsState.formData,
            ...formData
          },
        });
      };
    };
    if (stepsState.step === forms.length - 1) {
      setAlert('Formulario Valido.', 'success');
    }
  };

  function getSteps() {
    let step = forms.find((step, index) => stepsState.step === index)
    console.log(step)
    return step
  }

  function prevForm() {
    console.log(stepsState.step)
    console.log(stepsState.step - 1)
    setStepsState({
      ...stepsState,
      step: stepsState.step - 1,
    });
  }

  if ((Object.keys(forms) && Object.keys(forms).length < 1) || forms.error) {
    return <Redirect to='/' />;
  }

  // console.log(forms)
  // console.log(forms.length)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', marginRight: '1rem' }}>
        <Form
          schema={forms ? getSteps().schema : {}}
          uiSchema={forms ? forms[stepsState.step].uiSchema : {}}
          onSubmit={onSubmit}
          formData={stepsState.formData}
          // liveValidate={true}
          transformErrors={transformErrors}
          validate={validate}
          showErrorList={false}
          noHtml5Validate={true}
        >
          <div className='form-buttons'>
            {
              stepsState.step === 0 ? (
                <Fragment>
                  <div></div>
                  <button type='submit' className='btn btn-primary btn-sm pull-right'>
                    Siguiente
                  </button>
                </Fragment>

              ) : (
                  stepsState.step === forms.length - 1 ? (
                    <Fragment>
                      <Link className='btn btn-primary btn-sm' to="#!" onClick={prevForm}>
                        Anterior
                    </Link>
                      <button type='submit' className='btn btn-success btn-sm'>
                        Validar
                    </button>
                    </Fragment>
                  ) : (
                      <Fragment>
                        <Link className='btn btn-primary btn-sm' onClick={prevForm}>
                          Anterior
                    </Link>
                        <button type='submit' className='btn btn-primary btn-sm'>
                          Siguiente
                    </button>
                      </Fragment>
                    )
                )
            }
          </div>
        </Form>
        <hr />
        <Link to={goBack} className='btn btn-default'>
          Volver
          </Link>
      </div>
      <SchemaViewer form={stepsState.formData} />
    </div>
  );
};

FormRender.propTypes = {
  forms: PropTypes.array.isRequired,
  goBack: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  forms: state.form
});

export default connect(mapStateToProps, { setAlert })(FormRender);
