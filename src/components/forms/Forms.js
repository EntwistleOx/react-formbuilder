import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearForm } from '../../actions/form';
import FormItem from './FormItem';
import PropTypes from 'prop-types';

// TODO:
// view form by id

const Forms = ({ forms, clearForm }) => {
  useEffect(() => {
    clearForm();
  }, [clearForm]);

  return (
    <Fragment>
      <div
        className='page-header'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1>Formularios</h1>
        <Link to='/formbuilder' className='btn btn-default'>
          Crear
        </Link>
      </div>

      {forms.length > 0 ? (
        <table className='table table-striped table-hover  form-list'>
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, i) => (
              <FormItem
                key={i}
                /*key={form.schema.idPrefix}*/ form={form}
                index={i + 1}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className='well'>
          <h4>
            <strong>Aviso!</strong>
          </h4>
          <p>
            No hay contenido disponible.
            <Link to='/formbuilder' className='alert-link'>
              {' '}
              Comienza a agregar formularios aca
            </Link>
            .
          </p>
        </div>
      )}
    </Fragment>
  );
};

Forms.propTypes = {
  forms: PropTypes.array.isRequired,
  clearForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forms: state.forms
});

export default connect(mapStateToProps, { clearForm })(Forms);
