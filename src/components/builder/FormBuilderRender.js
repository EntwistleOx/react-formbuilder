import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import FormRender from '../render/FormRender';
import PropTypes from 'prop-types';

const FormBuilderRender = props => {
    const { form } = props;
    return (
        <Fragment>
            <FormRender form={form} goBack={'/formbuilder'} />
        </Fragment>
    )
};

FormBuilderRender.propTypes = {
    form: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    form: state.form
})

export default connect(mapStateToProps)(FormBuilderRender);
