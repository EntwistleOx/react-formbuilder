import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

const Formrender = ({ formSchema }) => {
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
    //     11726111-5
    //     13067971-4
    //     15223952-1
    //     15496120-8
    //     16003145-k
    //     16158088-0
    //     16931829-8
    //     17577561-7
    //     19791795-4
    //     20181773-0
    //     20309424-8
    //     21705755-8
    //     23023518-k
    //     23559651-2
    //     24261604-9
    //     24901269-6
    //     6709127-2
    //     8139919-0
    //     8702020-7

    // RUT invalidos
    //     10864629-1
    //     11726111-6
    //     13067971-6
    //     15223952-2
    //     15496120-9
    //     16003145-0
    //     16158088-1

    Object.keys(formData).forEach(function(item) {
      // console.log(item); // key
      // console.log(formData[item]); // value

      const key = item;
      const val = formData[item];

      if (formSchema.schema.properties[item].key === 'rut') {
        if (val === undefined) {
          return;
        }

        if (!val || val.trim().length < 3) {
          errors[key].addError('Rut invalido');
          return;
        }

        const rutLimpio = val.replace(/[^0-9kK-]/g, '');

        if (rutLimpio.length < 3) {
          errors[key].addError('Rut invalido');
          return;
        }

        const split = rutLimpio.split('-');

        if (split.length !== 2) {
          errors[key].addError('Rut invalido');
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
          errors[key].addError('Rut invalido');
        }
      }
    });
    return errors;
  };

  const onSubmit = formData => {
    console.log(formData);
  };

  return (
    <Fragment>
      <div className='container'>
        <Form
          schema={formSchema.schema}
          uiSchema={formSchema.uiSchema}
          onSubmit={onSubmit}
          // formData={formSchema.formData}
          // liveValidate={true}
          transformErrors={transformErrors}
          validate={validate}
          showErrorList={false}
          noHtml5Validate={true}
        />
      </div>
    </Fragment>
  );
};

Formrender.propTypes = {
  formSchema: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  formSchema: state.form
});

export default connect(mapStateToProps)(Formrender);
