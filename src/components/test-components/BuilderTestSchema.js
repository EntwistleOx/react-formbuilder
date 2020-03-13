import React, { useState } from 'react';
import Form from "react-jsonschema-form";
import JsonViewer from '../json-viewer/JsonViewer';
// import * as Grouped from "./GroupedSchema"; => default object template
import * as Templates from "./GroupedRegistry";
import * as UiTemplate from "./UiTemplate";
import CustomFieldTemplate from './FieldTemplate';
import { ObjectFieldTemplate } from "./GroupedSchema";
import { CustomObjectFieldTemplate } from './CustomGroupedSchema';

const schema = {
    title: 'Titulo del Formulario',
    type: 'object',
    // required: ['oferta', 'motivo', 'calle', 'numero', 'comuna'],
    properties: {
        // nombre: { type: "string" },
        // edad: { type: "number" },
        // parrafo: {
        //     "title": "Parrafo",
        //     "type": "null",
        //     "key": "paragraph",
        //     "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Quod vero magnam quibusdam assumenda, voluptatem quo quos perferendis totam consequatur voluptates."
        // },
        // oferta: {
        //     title: "Acepta La Oferta?",
        //     type: "string",
        //     key: "select",
        //     enum: [
        //         "Acepta",
        //         "No Acepta",
        //         "Lo Pensara"
        //     ],
        //     enumVal: [
        //         "acepta",
        //         "no-acepta",
        //         "lo-pensara"
        //     ],
        //     default: "Lo Pensara"
        // },
        // motivo: {
        //     title: "Motivo no acepta?",
        //     type: "string",
        //     enum: [
        //         "Sin Trabajo",
        //         "No Confia en Llamado",
        //         "CAE Muy Alto"
        //     ],
        //     enumVal: [
        //         "sin-trabajo",
        //         "no-confia",
        //         "cae-muy-alto"
        //     ],
        // },
        // calle: { type: "string" },
        // numero: { type: "number" },
        // comuna: { type: "string" }
    },
}

const groups = [
    {
        "Paso-0": [/*"nombre", "edad"*/],
        "Paso-1": [/*"parrafo", "oferta"*/],
        // "Paso-2": ["motivo"],
        // "Paso-3": ["calle", "numero", "comuna"],
        "ui:template": "well",
    }
];

const uiSchema = {
    "ui:groups": groups,
    "ui:template": CustomObjectFieldTemplate
    // "ui:template": ObjectFieldTemplate
}

const TestSchema = () => {

    const onChange = (e) => {
        console.log(e.formData.oferta)
    }

    return (
        <div className="container">
            <Form
                schema={schema}
                uiSchema={uiSchema}
                formContext={{
                    templates: Templates.GroupTemplates
                }}
                {...UiTemplate}
                FieldTemplate={CustomFieldTemplate}
            // onChange={onChange}
            />

            <JsonViewer form={schema} />
        </div >
    )
}

export default TestSchema
