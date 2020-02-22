import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editElement } from '../../actions/form';
import { setAlert } from '../../actions/alert';

import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

//TODO:
// check effect dependencies

const EditFormElement = props => {
  const id = props.match.params.id;

  const { element, editElement, setAlert } = props;

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
      }
    }
  });

  // UI state
  const [uiSchema, setUiSchema] = useState({
    key: {
      'ui:widget': 'hidden'
    }
  });

  // Formdata state
  const [formData, setFormData] = useState({
    title: '',
    key: ''
  });

  useEffect(() => {
    // Required Field
    const isRequired = element.required.find(element => element === id);

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
            type: 'string',
            title: 'Descripcion'
          }
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        title: element.title ? element.title : '...titulo del formulario',
        description: element.description
          ? element.description
          : '...descripcion del formulario',
        key: id
      });
      return;
    }

    //Paragraph field
    else if (element.properties[id].key === 'paragraph') {
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
        description: element.properties[id].description,
        key: element.properties[id].key
      });
      return;
    }

    // Select Field
    else if (element.properties[id].key === 'select') {
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
      const keys = element.properties[id].enum;
      const values = element.properties[id].enumNames;
      options = keys.map((_, i) => {
        return { key: keys[i], value: values[i] };
      });

      // Populate fields
      setFormData({
        ...formData,
        title: element.properties[id].title
          ? element.properties[id].title
          : '...titulo del elemento',
        required: isRequired ? true : false,
        key: element.properties[id].key,
        options
      });
      return;
    }

    // Radio Field
    else if (element.properties[id].key === 'radio') {
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
      items = element.properties[id].enumNames;
      setFormData({
        ...formData,
        title: element.properties[id].title
          ? element.properties[id].title
          : '...titulo del elemento',
        required: isRequired ? true : false,
        key: element.properties[id].key,
        items
      });
      return;
    }

    // Checkboxes Field
    else if (element.properties[id].key === 'checkboxes') {
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
      items = element.properties[id].items.enum;
      setFormData({
        ...formData,
        title: element.properties[id].title
          ? element.properties[id].title
          : '...titulo del elemento',
        required: isRequired ? true : false,
        key: element.properties[id].key,
        items
      });
    } else {
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
        title: element.properties[id].title
          ? element.properties[id].title
          : '...titulo del elemento',
        required: isRequired ? true : false,
        key: element.properties[id].key
      });
    }
  }, [element, id, props]);

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
  element: PropTypes.object.isRequired,
  editElement: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  element: state.form.schema
});

export default connect(mapStateToProps, { editElement, setAlert })(
  EditFormElement
);
