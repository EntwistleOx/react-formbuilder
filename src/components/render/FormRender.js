import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Form from "react-jsonschema-form";
import PropTypes from 'prop-types';

const Formrender = ({ formSchema }) => {

    const onSubmit = (e) => {
        console.log(e)
    }

    return (
        <Fragment>
            <h2>render</h2>
            <div className="container">
                <Form
                    schema={formSchema.schema}
                    uiSchema={formSchema.uiSchema}
                    onSubmit={onSubmit}
                    // formData={formSchema.formData}
                    // liveValidate={true}
                    noHtml5Validate={true}
                />
            </div>
        </Fragment>
    )
}

Formrender.propTypes = {
    formSchema: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    formSchema: state.form,
})

export default connect(mapStateToProps)(Formrender)
