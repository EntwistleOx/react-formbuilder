import React from 'react';
import Form from "react-jsonschema-form";

const schema =
{
    "title": "Form Elements",
    "description": "List All Elements.",
    "type": "object",
    "required": [
        "text"
    ],
    "properties": {
        "checkbox": {
            "type": "boolean",
            "title": " Checkbox",
            "default": false
        },
        "email": {
            "type": "string",
            "format": "email",
            "title": "Email",
        },
        "date": {
            "type": "string",
            "title": "Fecha",
            "format": "date"
        },
        "number": {
            "type": "number",
            "title": "Numero"
        },
        "paragraph": {
            "title": "Parrafo",
            "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Quod vero magnam quibusdam assumenda, voluptatem quo quos perferendis totam consequatur voluptates.",
            "type": "null"
        },
        "radio": {
            "type": "boolean",
            "title": "Radio"
        },
        "select": {
            "title": "Select",
            "type": "string",
            "enum": [
                "foo",
                "bar"
            ],
            "enumNames": [
                "Foo",
                "Bar"
            ]
        },
        "textarea": {
            "type": "string",
            "title": "Textarea"
        },
        "text": {
            "type": "string",
            "title": "Texto"
        },
    }
};

const uiSchema = {
    "radio": {
        "ui:widget": "radio"
    },
    "select": {
        "ui:placeholder": "Seleciona"
    },
    "textarea": {
        "ui:widget": "textarea"
    },

};

function ElementTemplate(props) {
    const { id, classNames, label, required, description, children } = props;
    console.log(props)
    return (
        <div className={classNames}>
            {
                id !== 'root' ?
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label htmlFor={id}>{label}{required ? "*" : null}</label>
                        <div>
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash-alt"></i>
                            <i className="fas fa-arrows-alt"></i>
                        </div>
                    </div>
                    : ''
            }
            {children}
            {description}
        </div >
    );
}

const TestSchema = () => {
    return (
        <div className="container">
            <Form schema={schema} uiSchema={uiSchema} FieldTemplate={ElementTemplate} >
                <button className="btn btn-primary" type="submit">Enviar</button>
            </Form>
        </div>
    )
}

export default TestSchema
