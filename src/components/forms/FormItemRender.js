import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import FormRender from '../render/FormRender';
import PropTypes from 'prop-types';

const FormItemRender = props => {
    const id = props.match.params.id;
    const { forms } = props;

    const form = forms.find(form => form.schema.idPrefix === id)

    return (
        <Fragment>
            <FormRender form={form} goBack={'/forms'} />
        </Fragment>
    )
}

FormItemRender.propTypes = {
    forms: PropTypes.array.isRequired,
    id: PropTypes.string,
}

const mapStateToProps = (state) => ({
    forms: state.forms
})

export default connect(mapStateToProps)(FormItemRender);
