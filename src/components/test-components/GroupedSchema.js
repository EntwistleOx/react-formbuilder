import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

export function ObjectFieldTemplate(props) {
    const { TitleField, DescriptionField } = props;

    return (
        <fieldset>
            {/* FORM TITLE */}
            {(props.uiSchema["ui:title"] || props.title) && (
                <Fragment>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        }}
                    >
                        <TitleField
                            id={`${props.idSchema.$id}__title`}
                            title={props.title || props.uiSchema["ui:title"]}
                            required={props.required}
                            formContext={props.formContext}
                        />
                        <div style={{ display: 'flex', fontSize: '15px' }}>
                            <Link to='#!'>
                                <i className='fas fa-edit'></i>
                            </Link>
                            <Link to='#!'>
                                <i className='fas fa-trash-alt'></i>
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}

            {/* FORM DESCRIPTION */}
            {props.description && (
                <DescriptionField
                    id={`${props.idSchema.$id}__description`}
                    description={props.description}
                    formContext={props.formContext}
                />
            )}
            {doGrouping({
                properties: props.properties,
                groups: props.uiSchema["ui:groups"],
                props: props
            })}
        </fieldset>
    );
}

const REST = Symbol("REST");
const EXTRANEOUS = Symbol("EXTRANEOUS");
function doGrouping({ properties, groups, props }) {
    if (!Array.isArray(groups)) {
        return props.map(p => p.content);
    }
    const mapped = groups.map((g, index) => {
        if (typeof g === "string") {
            const found = properties.filter(p => p.name === g);
            if (found.length === 1) {
                const el = found[0];
                return el.content;
            }
            return EXTRANEOUS;
        } else if (typeof g === "object") {
            const { templates } = props.formContext;
            const GroupComponent = templates
                ? templates[g["ui:template"]]
                : DefaultTemplate;
            const _properties = Object.keys(g).reduce((acc, key) => {

                const Name = () => {
                    return <legend>{key}</legend>
                }

                const field = g[key];
                if (key.startsWith("ui:")) return acc;
                if (!Array.isArray(field)) return acc;
                return [
                    ...acc,
                    {
                        name: <Name />,
                        children: doGrouping({
                            properties,
                            props,
                            groups: field
                        })
                    }
                ];
            }, []);
            return <GroupComponent key={index} properties={_properties} />;
        }
        throw new Error("Invalid object type: " + typeof g + " " + g);
    });
    const remainder = mapped.filter(m => m === REST);
    if (remainder.length > 0) {
        throw new Error("Remainder fields not supported");
    }
    const extraneous = mapped.filter(m => m === EXTRANEOUS);
    if (extraneous.length) {
        throw new Error("Extranoues fields" + extraneous);
    }

    return mapped;
}

function DefaultTemplate(props) {
    return props.properties.map(p => p.children);
}
