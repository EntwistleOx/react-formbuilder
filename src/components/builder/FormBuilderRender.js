import React, { Fragment } from 'react';
import FormRender from '../render/FormRender';

const FormBuilderRender = () => {
  return (
    <Fragment>
      <FormRender goBack={'/formbuilder'} />
    </Fragment>
  );
};

export default FormBuilderRender;
