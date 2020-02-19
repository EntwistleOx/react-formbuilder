import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editElement } from '../../actions/form';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

//TODO:
// do something when id not exist
// refactor setformdata on useeffect
// check effect dependencies

const EditFormElement = props => {
  const id = props.match.params.id;
  const { element, required, editElement } = props;
  console.log(props);

  // Schema state
  const [schema, setSchema] = useState({
    title: 'Editar Elemento',
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: 'Titulo'
      },
      required: {
        type: 'boolean',
        title: 'Requerido'
      },
    }
  });

  // UI state
  const [uiSchema, setUiSchema] = useState({});

  // Formdata state
  const [formData, setFormData] = useState({
    title: '',
    required: false,
    options: []
  });

  useEffect(() => {
    if (!Object.keys(element).length) {
      return props.history.push(`/formbuilder`);
    }
    const isRequired = required.find(element => element === id);
    let options;
    if (element[id].enum) {
      // add options to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          options: {
            type: 'array',
            title: 'Options',
            items: {
              type: 'object',
              properties: {
                key: {
                  "type": "string",
                  "title": "Key",
                },
                value: {
                  "type": "string",
                  "title": "Value",
                },
              }
            }
          }
        }
      });
      // Options objects
      const keys = element[id].enum;
      const values = element[id].enumNames;
      options = (keys.map((_, i) => {
        return { key: keys[i], value: values[i] }
      }));
    };

    let items;
    if (element[id].items) {
      // add options to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          items: {
            type: "array",
            title: "Opciones",
            items: {
              type: "string",
            }
          },
        }
      });
      items = element[id].items.enum;
    }

    setFormData({
      ...formData,
      title: element[id].title ? element[id].title : '...titulo del elemento',
      required: isRequired ? true : false,
      options,
      items
    });
  }, [element, id, props, required]);

  const onSubmit = e => {
    editElement(id, e.formData);
    return props.history.push(`/formbuilder`);
  };

  return (
    <div id='editFormElement' className='container'>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

EditFormElement.propTypes = {
  element: PropTypes.object.isRequired,
  required: PropTypes.array.isRequired,
  editElement: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  element: state.form.schema.properties,
  required: state.form.schema.required
});

export default connect(mapStateToProps, { editElement })(EditFormElement);
