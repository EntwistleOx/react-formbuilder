import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editElement } from '../../actions/form';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

//TODO:
// do something when id not exist

const EditFormElement = props => {
  const id = props.match.params.id;

  const { element, required, editElement } = props;

  console.log(props);

  const [schema, setSchema] = useState({
    title: 'Editar Elemento',
    type: 'object',
    definitions: {
      option: {
        type: 'object',
        properties: {
          key: {
            type: 'string'
          },
          value: {
            type: 'string'
          }
        }
      }
    },
    properties: {
      title: {
        type: 'string',
        title: 'Titulo'
      },
      required: {
        type: 'boolean',
        title: 'Requerido'
      },
      options: {
        type: 'array',
        items: [
          {
            $ref: '#/definitions/option'
          }
        ],
        additionalItems: {
          $ref: '#/definitions/option'
        }
      }
    }
  });

  const [uiSchema, setuiSchema] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    required: false,
    options: [
      ['key', 'value'],
      ['key1', 'value2']
    ]
  });

  //   useEffect(() => {
  //     if (!Object.keys(element).length) {
  //       return props.history.push(`/formbuilder`);
  //     }
  //     const keys = element[id].enum;
  //     const values = element[id].enumNames;
  //     setFormData(Object.fromEntries(keys.map((_, i) => [keys[i], values[i]])));
  //   }, [element, id]);

  useEffect(() => {
    if (!Object.keys(element).length) {
      return props.history.push(`/formbuilder`);
    }
    const isRequired = required.find(element => element === id);
    setFormData({
      ...formData,
      title: element[id].title ? element[id].title : '...titulo del elemento',
      required: isRequired ? true : false
    });
  }, [element, id, props, required]);

  const onSubmit = e => {
    console.log(e.formData);
    editElement(id, e.formData);
    return props.history.push(`/formbuilder`);
  };

  console.log(schema);
  console.log(formData);

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
