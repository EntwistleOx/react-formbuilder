import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { editElement } from '../../actions/form';
import { setAlert } from '../../actions/alert';

import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

//TODO:
// use form schema from form context
// send key via props, not formData
// check effect dependencies

const EditFormElement = props => {
  const context = props.match.params.context;
  const id = props.match.params.id;

  const { form, editElement, setAlert } = props;

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
      context: {
        type: 'string',
        title: 'Type'
      },
    }
  });

  // UI state
  const [uiSchema, setUiSchema] = useState({
    key: {
      'ui:widget': 'hidden'
    },
    context: {
      'ui:widget': 'hidden'
    },
  });

  // Formdata state
  const [formData, setFormData] = useState({
    title: '',
    key: '',
    context: '',
  });

  useEffect(() => {
    // if (forms.json && forms.json.length < 1) {
    //   return <Redirect to='/' />;
    // }

    // const result = forms.json.findIndex(
    //   form => form.schema.idPrefix === formId
    // );

    let options;
    let items;

    // Form Title
    if (context === 'form') {
      // add description to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        title: form.schema.title ? form.schema.title : '...titulo del formulario',
        key: id,
        context: context
      });
    }

    // Step Title
    else if (context === 'step') {
      setSchema({
        ...schema,
        properties: {
          ...schema.properties
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        title: form.uiSchema['ui:groups'][0][id] ? id : '...titulo del paso',
        key: id,
        context: context
      });
    }

    //Paragraph Field
    else if (form.schema.properties[id].key === 'paragraph') {
      // add description to schema
      setSchema({
        ...schema,
        properties: {
          description: {
            type: 'string',
            title: 'Descripcion'
          }
        }
      });

      // textarea widget
      setUiSchema({
        ...uiSchema,
        description: {
          'ui:widget': 'textarea',
          'ui:options': {
            rows: 4
          }
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        description: form.schema.properties[id].description,
        key: form.schema.properties[id].key
      });
    }

    // Select Field
    else if (form.schema.properties[id].key === 'select') {
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
                  type: 'string',
                  title: 'Key'
                },
                value: {
                  type: 'string',
                  title: 'Value'
                }
              }
            }
          }
        }
      });

      // Options objects
      const keys = form.schema.properties[id].enum;
      const values = form.schema.properties[id].enumNames;
      options = keys.map((_, i) => {
        return { key: keys[i], value: values[i] };
      });

      // Populate fields
      setFormData({
        ...formData,
        title: form.schema.properties[id].title ? form.schema.properties[id].title : '...titulo del elemento',
        required: form.schema.required.find(
          element => element === id
        ) ? true : false,
        key: form.schema.properties[id].key,
        options
      });
    }

    // Radio field
    else if (form.schema.properties[id].key === 'radio') {
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
            type: 'array',
            title: 'Opciones',
            items: {
              type: 'string'
            }
          }
        }
      });

      // disabled buttons on uiSchema
      setUiSchema({
        ...uiSchema,
        items: {
          'ui:options': {
            addable: false,
            orderable: false,
            removable: false
          }
        }
      });

      // Populate fields
      items = form.schema.properties[id].enumNames;
      setFormData({
        ...formData,
        title: form.schema.properties[id].title ? form.schema.properties[id].title : '...titulo del elemento',
        required: form.schema.required.find(
          element => element === id
        ) ? true : false,
        key: form.schema.properties[id].key,
        items
      });
    }

    // Checkboxes field
    else if (form.schema.properties[id].key === 'checkboxes') {
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
            type: 'array',
            title: 'Opciones',
            items: {
              type: 'string'
            }
          }
        }
      });

      // Populate fields
      items = form.schema.properties[id].items.enum;
      setFormData({
        ...formData,
        title: form.schema.properties[id].title ? form.schema.properties[id].title : '...titulo del elemento',
        required: form.schema.required.find(
          element => element === id
        ) ? true : false,
        key: form.schema.properties[id].key,
        items
      });
    }

    // Rest of fields fields
    else {
      // add items to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          required: {
            type: 'boolean',
            title: 'Requerido'
          }
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        title: form.schema.properties[id].title ? form.schema.properties[id].title : '...titulo del elemento',
        required: form.schema.required.find(
          element => element === id
        ) ? true : false,
        key: form.schema.properties[id].key
      });
    }
  }, []); // End UseEffect

  const onSubmit = e => {
    editElement(context, id, e.formData);
    setAlert('Elemento Editado.', 'success');
    return props.history.push(`/formbuilder`);
  };

  return (
    <div id='editFormElement'>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onSubmit={onSubmit}
      >
        <div className='form-buttons'>
          <Link to='/formbuilder' className='btn btn-default'>
            Volver
          </Link>
          <button type='submit' className='btn btn-success'>
            Guardar
          </button>
        </div>
      </Form>
    </div>
  );
};

EditFormElement.propTypes = {
  forms: PropTypes.object.isRequired,
  editElement: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps, { editElement, setAlert })(
  EditFormElement
);
