import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteForm } from '../../actions/form';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const FormItem = ({ form, index, deleteForm, setAlert }) => {
  return (
    <Fragment>
      <tr>
        <td>{index}</td>
        <td>{form.title}</td>
        <td>{form.description}</td>
        <td>
          <Link to={`/form-view/${form.id}`}>
            <i className='far fa-eye'></i>
          </Link>

          <Link to={`/form-edit/${form.id}`}>
            <i className='fas fa-edit'></i>
          </Link>

          <Link to='#!'>
            <i
              onClick={() => {
                deleteForm(form.id);
                setAlert('Formulario Eliminado.', 'success');
              }}
              className='fas fa-trash-alt'
            ></i>
          </Link>
        </td>
      </tr>
    </Fragment>
  );
};

FormItem.propTypes = {
  form: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteForm: PropTypes.func.isRequired
};

export default connect(null, { deleteForm, setAlert })(FormItem);
