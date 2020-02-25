import React, { useState } from 'react';
import Form from "react-jsonschema-form";

const stepsShema = [
    {
        "schema": {
            "idPrefix": "$DVE7h9g",
            "title": "Titulo del Formulario",
            "description": "Descripcion del Formulario.",
            "type": "object",
            "required": [
                "Akr7x1vc"
            ],
            "properties": {
                "Akr7x1vc": {
                    "title": "Email",
                    "type": "string",
                    "key": "email",
                    "format": "email"
                }
            }
        },
        "uiSchema": {
            "ui:order": [
                "Akr7x1vc"
            ],
            "Akr7x1vc": {
                "ui:placeholder": "...my@email.cl"
            }
        },
        "formData": {
        }
    },
    {
        "schema": {
            "idPrefix": "zVeT2EC1",
            "title": "Titulo del Formulario",
            "description": "Descripcion del Formulario.",
            "type": "object",
            "required": [
                "Qs6BTKbt"
            ],
            "properties": {
                "Qs6BTKbt": {
                    "title": "Number",
                    "type": "number",
                    "key": "number"
                }
            }
        },
        "uiSchema": {
            "ui:order": [
                "Qs6BTKbt"
            ],
            "Qs6BTKbt": {
                "ui:placeholder": "...12345"
            }
        },
        "formData": {
        }
    }
]

// [
//     {
//         title: "Step 1",
//         type: "object",
//         required: ["name"],
//         properties: {
//             name: { type: "string" },
//         }
//     },

//     {
//         title: "Step 2",
//         type: "object",
//         required: ["age"],
//         properties: {
//             age: { type: "integer" },
//         }
//     },

//     {
//         title: "Step 3",
//         type: "object",
//         required: ["email"],
//         properties: {
//             email: { type: "string" },
//         }
//     },

//     {
//         title: "Step 4",
//         type: "object",
//         required: ["phone"],
//         properties: {
//             phone: { type: "number" },
//         }
//     }
// ]



const TestSchema = () => {

    const [state, setState] = useState({ step: 1, formData: {} })

    function getSteps() {
        let step = stepsShema.find((step, index) => state.step === index + 1)
        if (step === undefined) step = {}
        return step
    }

    const onSubmit = ({ formData }) => {
        let index = 0
        for (index; index <= state.step; index++) {
            setState({
                step: index + 1,
                formData: {
                    ...state.formData,
                    ...formData
                },
            });
        }
        if (stepsShema.length < index) {
            console.log(formData);
            alert("You submitted " + JSON.stringify(formData, null, 2));
        }
    }

    return (
        <div className="container">
            <Form
                schema={getSteps().schema}
                onSubmit={onSubmit}
                formData={state.formData} />
        </div>
    )
}

export default TestSchema
