import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editElement } from '../../actions/form';
import Form from "react-jsonschema-form";
import PropTypes from 'prop-types';

//TODO:
// do something when id not exist

const EditFormElement = (props) => {
    const id = props.match.params.id;

    const { element, required, editElement } = props;

    const [schema, setSchema] = useState({
        title: "Editar Elemento",
        type: "object",
        properties: {
            title: {
                type: "string",
                title: "Titulo"
            },
            required: {
                type: "boolean",
                title: "Requerido"
            }
        }
    });

    const [formData, setFormData] = useState({
        title: '',
        required: false
    });

    useEffect(() => {
        if (!Object.keys(element).length) {
            return props.history.push(`/formbuilder`)
        }

        const isRequired = required.find(element => element === id)

        setFormData({
            title: element[id].title ? element[id].title : '...titulo del elemento',
            required: isRequired ? true : false,
        });
    }, [element, id, props, required])

    const onSubmit = (e) => {
        editElement(id, e.formData);
        return props.history.push(`/formbuilder`);
    }

    return (
        <div id="editFormElement" className="container">
            <Form
                schema={schema}
                formData={formData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

EditFormElement.propTypes = {
    element: PropTypes.object.isRequired,
    required: PropTypes.array.isRequired,
    editElement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    element: state.form.schema.properties,
    required: state.form.schema.required,
})

export default connect(mapStateToProps, { editElement })(EditFormElement);