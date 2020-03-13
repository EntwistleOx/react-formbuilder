import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

export function CustomObjectFieldTemplate(props) {

  const { TitleField, DescriptionField } = props;

  return (
    <fieldset>
      {/* FORM TITLE */}
      {(props.uiSchema["ui:title"] || props.title) && (
        <Fragment>
          <div
            className='form-title'
          >
            <TitleField
              id={`${props.idSchema.$id}__title`}
              title={props.title || props.uiSchema["ui:title"]}
              required={props.required}
              formContext={props.formContext}
            />
            <div style={{ display: 'flex', fontSize: '15px' }}>
              <Link to={`/formbuilder/form/${props.formContext.schema.id}/`}>
                <i className='fas fa-edit'></i>
              </Link>
              <Link to='#!'>
                <i onClick={() => {
                  props.formContext.fnClearForm();
                  props.formContext.fnSetTemplate('well', 'custom');
                }} className='fas fa-trash-alt'></i>
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

      {/* FORM CONTENT */}
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
        return (
          <Draggable index={index} key={g} draggableId={g}>
            {(provided, snapshot) => (
              <div
                className="panel panel-default panel-bottom"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="panel-body">
                  {el.content}
                </div>
              </div>
            )}
          </Draggable>
        )
      } else {
        return ''
      }
      // return EXTRANEOUS;
    } else if (typeof g === "object") {
      const { templates } = props.formContext;
      const GroupComponent = templates
        ? templates[g["ui:template"]]
        : DefaultTemplate;
      const _properties = Object.keys(g).reduce((acc, key) => {

        const Name = () => {
          return <div className='step-title'>
            <legend>
              {key}
            </legend>
            <div className='step-icons'>
              <Link to={`/formbuilder/step/${key}/`}>
                <i className='fas fa-edit'></i>
              </Link>
              <Link to='#!'>
                <i onClick={() => props.formContext.fnDeleteStep(key)} className='fas fa-trash-alt'></i>
              </Link>
            </div>
          </div>
        }

        const field = g[key];
        if (key.startsWith("ui:")) return acc;
        if (!Array.isArray(field)) return acc;
        return [
          ...acc,
          {
            key: key,
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
