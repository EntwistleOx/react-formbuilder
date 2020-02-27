import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { editElement } from '../../actions/form';
import { setAlert } from '../../actions/alert';

import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

//TODO:
// check effect dependencies

const EditFormElement = props => {

  const formId = props.match.params.formId;
  const id = props.match.params.id;

  const { forms, editElement, setAlert } = props;

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
      formId: {
        type: 'string',
        title: 'Type'
      }
    }
  });

  // UI state
  const [uiSchema, setUiSchema] = useState({
    key: {
      'ui:widget': 'hidden'
    },
    formId: {
      'ui:widget': 'hidden'
    }
  });

  // Formdata state
  const [formData, setFormData] = useState({
    title: '',
    key: '',
    formId: formId
  });

  useEffect(() => {

    if (forms && forms.length < 1) {
      return <Redirect to='/' />;
    }

    const result = forms.findIndex(form => form.schema.idPrefix === formId)

    let options;
    let items;

    // Form Root
    if (forms[result].schema.idPrefix === formId && id === formId) {
      // add description to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          description: {
            type: 'string',
            title: 'Descripcion'
          }
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        title: forms[result].schema.title ? forms[result].schema.title : '...titulo del formulario',
        description: forms[result].schema.description ? forms[result].schema.description : '...descripcion del formulario',
        key: id
      });
    }

    //Paragraph field
    else if (forms[result].schema.idPrefix === formId && forms[result].schema.properties[id].key === 'paragraph') {
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
        description: forms[result].schema.properties[id].description,
        key: forms[result].schema.properties[id].key
      });
    }

    // Select Field
    else if (forms[result].schema.idPrefix === formId && forms[result].schema.properties[id].key === 'select') {
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
      const keys = forms[result].schema.properties[id].enum;
      const values = forms[result].schema.properties[id].enumNames;
      options = keys.map((_, i) => {
        return { key: keys[i], value: values[i] };
      });

      // Populate fields
      setFormData({
        ...formData,
        title: forms[result].schema.properties[id].title ? forms[result].schema.properties[id].title : '...titulo del elemento',
        required: forms[result].schema.required.find(element => element === id) ? true : false,
        key: forms[result].schema.properties[id].key,
        options
      });
    }

    // Radio Field
    else if (forms[result].schema.idPrefix === formId && forms[result].schema.properties[id].key === 'radio') {
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
      items = forms[result].schema.properties[id].enumNames;
      setFormData({
        ...formData,
        title: forms[result].schema.properties[id].title ? forms[result].schema.properties[id].title : '...titulo del elemento',
        required: forms[result].schema.required.find(element => element === id) ? true : false,
        key: forms[result].schema.properties[id].key,
        items
      });
      return
    }

    // Checkboxes Field
    else if (forms[result].schema.idPrefix === formId && forms[result].schema.properties[id].key === 'checkboxes') {
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
      items = forms[result].schema.properties[id].items.enum;
      setFormData({
        ...formData,
        title: forms[result].schema.properties[id].title ? forms[result].schema.properties[id].title : '...titulo del elemento',
        required: forms[result].schema.required.find(element => element === id) ? true : false,
        key: forms[result].schema.properties[id].key,
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
        title: forms[result].schema.properties[id].title ? forms[result].schema.properties[id].title : '...titulo del elemento',
        required: forms[result].schema.required.find(element => element === id) ? true : false,
        key: forms[result].schema.properties[id].key
      });
    }
  }, [forms, formId, id, props]); // End UseEffect

  const onSubmit = e => {
    editElement(id, e.formData);
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
  forms: PropTypes.array.isRequired,
  editElement: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forms: state.form.json
});

export default connect(mapStateToProps, { editElement, setAlert })(
  EditFormElement
);
