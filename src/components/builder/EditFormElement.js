import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { editElement } from '../../actions/form';
import { setAlert } from '../../actions/alert';

import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

//TODO:
// check effect dependencies
// refactor edit title and get url params => /form/step/element

const EditFormElement = props => {
  const root = props.match.params.formId;
  const formId = props.match.params.stepId;
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
      },
      root: {
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
    },
    root: {
      'ui:widget': 'hidden'
    }
  });

  // Formdata state
  const [formData, setFormData] = useState({
    title: '',
    key: '',
    formId: formId,
    root: root
  });

  useEffect(() => {
    if (forms.json && forms.json.length < 1) {
      return <Redirect to='/' />;
    }

    const result = forms.json.findIndex(
      form => form.schema.idPrefix === formId
    );

    // console.log(forms.json, formId, result);
    let options;
    let items;

    // Form Title
    if (formId === 'title' && root === 'root') {
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
        title: forms.title ? forms.title : '...titulo del formulario',
        key: id
      });
    }

    // // Step Title
    else if (formId === 'title') {
      const idTitle = forms.json.findIndex(form => form.schema.idPrefix === id);
      // add description to schema
      setSchema({
        ...schema,
        properties: {
          ...schema.properties
          // description: {
          //   type: 'string',
          //   title: 'Descripcion'
          // }
        }
      });

      // Populate fields
      setFormData({
        ...formData,
        title: forms.json[idTitle].schema.title
          ? forms.json[idTitle].schema.title
          : '...titulo',
        // description: forms[result].schema.description
        //   ? forms[result].schema.description
        //   : '...descripcion del formulario',
        key: id,
        root: root
      });
    }

    //Paragraph Field
    else if (
      forms.json[result].schema.idPrefix === formId &&
      forms.json[result].schema.properties[id].key === 'paragraph'
    ) {
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
        description: forms.json[result].schema.properties[id].description,
        key: forms.json[result].schema.properties[id].key
      });
    }

    // Select Field
    else if (
      forms.json[result].schema.idPrefix === formId &&
      forms.json[result].schema.properties[id].key === 'select'
    ) {
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
      const keys = forms.json[result].schema.properties[id].enum;
      const values = forms.json[result].schema.properties[id].enumNames;
      options = keys.map((_, i) => {
        return { key: keys[i], value: values[i] };
      });

      // Populate fields
      setFormData({
        ...formData,
        title: forms.json[result].schema.properties[id].title
          ? forms.json[result].schema.properties[id].title
          : '...titulo del elemento',
        required: forms.json[result].schema.required.find(
          element => element === id
        )
          ? true
          : false,
        key: forms.json[result].schema.properties[id].key,
        options
      });
    }

    // Radio field
    else if (
      forms.json[result].schema.idPrefix === formId &&
      forms.json[result].schema.properties[id].key === 'radio'
    ) {
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
      items = forms.json[result].schema.properties[id].enumNames;
      setFormData({
        ...formData,
        title: forms.json[result].schema.properties[id].title
          ? forms.json[result].schema.properties[id].title
          : '...titulo del elemento',
        required: forms.json[result].schema.required.find(
          element => element === id
        )
          ? true
          : false,
        key: forms.json[result].schema.properties[id].key,
        items
      });
      return;
    }

    // Checkboxes field
    else if (
      forms.json[result].schema.idPrefix === formId &&
      forms.json[result].schema.properties[id].key === 'checkboxes'
    ) {
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
      items = forms.json[result].schema.properties[id].items.enum;
      setFormData({
        ...formData,
        title: forms.json[result].schema.properties[id].title
          ? forms.json[result].schema.properties[id].title
          : '...titulo del elemento',
        required: forms.json[result].schema.required.find(
          element => element === id
        )
          ? true
          : false,
        key: forms.json[result].schema.properties[id].key,
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
        title: forms.json[result].schema.properties[id].title
          ? forms.json[result].schema.properties[id].title
          : '...titulo del elemento',
        required: forms.json[result].schema.required.find(
          element => element === id
        )
          ? true
          : false,
        key: forms.json[result].schema.properties[id].key
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
  forms: PropTypes.object.isRequired,
  editElement: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forms: state.form
});

export default connect(mapStateToProps, { editElement, setAlert })(
  EditFormElement
);
