import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import FormBuilder from '../builder/FormBuilder';
import { loadForm } from '../../actions/form';
import PropTypes from 'prop-types';

const FormEdit = props => {
  const id = props.match.params.id;
  const { forms, loadForm } = props;

  const form = forms.find(form => form.id === id);

  useEffect(() => {
    loadForm(form);
  }, [loadForm, form]);

  return (
    <Fragment>
      <FormBuilder />
    </Fragment>
  );
};

FormEdit.propTypes = {
  forms: PropTypes.array.isRequired,
  id: PropTypes.string,
  loadForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forms: state.forms
});

export default connect(mapStateToProps, { loadForm })(FormEdit);
