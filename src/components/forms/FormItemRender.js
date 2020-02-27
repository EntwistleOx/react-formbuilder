import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import FormRender from '../render/FormRender';
import { loadForm } from '../../actions/form';
import PropTypes from 'prop-types';

const FormItemRender = props => {
  const id = props.match.params.id;
  const { forms, loadForm } = props;

  const form = forms.find(form => form.id === id);
  loadForm(form);

  return (
    <Fragment>
      <FormRender goBack={'/forms'} />
    </Fragment>
  );
};

FormItemRender.propTypes = {
  forms: PropTypes.array.isRequired,
  id: PropTypes.string,
  loadForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forms: state.forms
});

export default connect(mapStateToProps, { loadForm })(FormItemRender);
