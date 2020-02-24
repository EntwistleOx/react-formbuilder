import React, { useState } from 'react';
import Form from "react-jsonschema-form";

const stepsShema = [
    {
        title: "Step 1",
        type: "object",
        required: ["name"],
        properties: {
            name: { type: "string" },
        }
    },

    {
        title: "Step 2",
        type: "object",
        required: ["age"],
        properties: {
            age: { type: "integer" },
        }
    },

    {
        title: "Step 3",
        type: "object",
        required: ["email"],
        properties: {
            email: { type: "string" },
        }
    },

    {
        title: "Step 4",
        type: "object",
        required: ["phone"],
        properties: {
            phone: { type: "number" },
        }
    }
]


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
            alert("You submitted " + JSON.stringify(formData, null, 2));
        }
    }

    return (
        <div className="container">
            <Form
                schema={getSteps()}
                onSubmit={onSubmit}
                formData={state.formData} />
        </div>
    )
}

export default TestSchema
