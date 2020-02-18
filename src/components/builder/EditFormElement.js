import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { } from '../../actions/form';
import Form from "react-jsonschema-form";
// import PropTypes from 'prop-types'

const EditFormElement = (props) => {
    const id = props.match.params.id

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
    })

    useEffect(() => {



        setFormData({
            title: "Campo de texto",
            required: true
        });
    }, [])

    return (
        <div id="editFormElement" className="container">
            <Form
                schema={schema}
                formData={formData}
            />
        </div>
    )
}

// EditFormElement.propTypes = {

// }

export default EditFormElement
