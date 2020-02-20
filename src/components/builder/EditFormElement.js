import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editElement } from '../../actions/form';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

//TODO:
// do something when id not exist
// refactor setformdata on useeffect
// check effect dependencies
// remove required if element is root

const EditFormElement = props => {
  const id = props.match.params.id;
  const { root, element, required, editElement } = props;

  // Schema state
  const [schema, setSchema] = useState({
    title: 'Editar Elemento',
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: 'Titulo'
      },
      key: {
        type: 'string',
        title: 'Type'
      },
    }
  });

  // UI state
  const [uiSchema, setUiSchema] = useState({
    key: {
      "ui:widget": "hidden"
    },
  });

  // Formdata state
  const [formData, setFormData] = useState({
    title: '',
    key: '',
  });

  useEffect(() => {
    if (!Object.keys(element).length) {
      return props.history.push(`/formbuilder`);
    }


    // Required Field
    const isRequired = required.find(element => element === id);

    let options;
    let items;

    // Root
    if (id === 'formRoot') {
      // add description to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          description: {
            type: "string",
            title: "Descripcion"
          },
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        title: root.title ? root.title : '...titulo del formulario',
        description: root.description ? root.description : '...descripcion del formulario',
        key: id,
      });
      return
    }

    //Paragraph field
    else if (element[id].key === 'paragraph') {
      // add description to schema
      setSchema({
        ...schema,
        properties: {
          description: {
            type: "string",
            title: "Descripcion"
          },
        }
      });

      // textarea widget 
      setUiSchema({
        ...uiSchema,
        description: {
          "ui:widget": "textarea",
          "ui:options": {
            "rows": 4
          }
        },
      });

      // Populate fields
      setFormData({
        ...formData,
        description: element[id].description,
        key: element[id].key
      });
      return
    }

    // Select Field
    else if (element[id].key === 'select') {
      // add options to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          required: {
            type: 'boolean',
            title: 'Requerido'
          },
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

      // Populate fields
      setFormData({
        ...formData,
        title: element[id].title ? element[id].title : '...titulo del elemento',
        required: isRequired ? true : false,
        key: element[id].key,
        options
      });
      return
    }

    // Radio Field
    else if (element[id].key === 'radio') {
      // add options to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          required: {
            type: 'boolean',
            title: 'Requerido'
          },
          items: {
            type: "array",
            title: "Opciones",
            items: {
              type: "string",
            }
          },
        }
      });

      // disabled buttons on uiSchema
      setUiSchema({
        ...uiSchema,
        items: {
          "ui:options": {
            "addable": false,
            "orderable": false,
            "removable": false
          }
        },
      });

      // Populate fields
      items = element[id].enumNames;
      setFormData({
        ...formData,
        title: element[id].title ? element[id].title : '...titulo del elemento',
        required: isRequired ? true : false,
        key: element[id].key,
        items,
      });
      return
    }

    // Checkboxes Field
    else if (element[id].key === 'checkboxes') {
      // add items to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          required: {
            type: 'boolean',
            title: 'Requerido'
          },
          items: {
            type: "array",
            title: "Opciones",
            items: {
              type: "string",
            }
          },
        }
      });

      // Populate fields
      items = element[id].items.enum;
      setFormData({
        ...formData,
        title: element[id].title ? element[id].title : '...titulo del elemento',
        required: isRequired ? true : false,
        key: element[id].key,
        items
      });
    }

    else {
      // add items to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          required: {
            type: 'boolean',
            title: 'Requerido'
          },
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        title: element[id].title ? element[id].title : '...titulo del elemento',
        required: isRequired ? true : false,
        key: element[id].key,
      });
    }
  }, [element, id, props, required]);

  const onSubmit = e => {
    editElement(id, e.formData);
    return props.history.push(`/formbuilder`);
  };

  console.log('edit', root)

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
  root: state.form.schema,
  element: state.form.schema.properties,
  required: state.form.schema.required
});

export default connect(mapStateToProps, { editElement })(EditFormElement);
