import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  addElement,
  reorderElement,
  moveElement
} from '../../actions/form';
import { DragDropContext } from 'react-beautiful-dnd';
import JsonViewer from '../json-viewer/JsonViewer';
import Canvas from './canvas/Canvas';
import ToolKit from './toolkit/Toolkit';
import PropTypes from 'prop-types';
import toolkitSchema from './toolkit/toolkitSchema';
import { getShortid } from '../../utils/shortId';

// TODO:
// use bootstrap boxes for elements and css

const Formbuilder = ({
  form,
  addElement,
  reorderElement,
  moveElement
}) => {
  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        reorderElement(source.index, destination.index, source, destination);
        break;
      // case source.droppableId:
      case 'ToolkitItems':
        // Source -> toolkit
        // All fields
        const title = toolkitSchema[source.index].name;
        const type = toolkitSchema[source.index].type;
        const key = toolkitSchema[source.index].key;

        // Radio, Checkbox
        const defaultVal = toolkitSchema[source.index].default;
        const constAttr = toolkitSchema[source.index].const;

        // Checkboxes
        const items = toolkitSchema[source.index].items;
        const uniqueItems = toolkitSchema[source.index].uniqueItems;
        // const minItems = toolkitSchema[source.index].minItems

        // Date, Email
        const format = toolkitSchema[source.index].format;

        // Paragraph
        const description = toolkitSchema[source.index].description;

        // Select
        const enumVal = toolkitSchema[source.index].enum;
        const enumNames = toolkitSchema[source.index].enumNames;

        // Create a new object depending if values exists
        const newElement = {
          ...(title && { title }),
          ...(type && { type }),
          ...(key && { key }),
          ...(defaultVal && { default: defaultVal }),
          ...(constAttr && { const: constAttr }),
          ...(items && { items }),
          ...(uniqueItems && { uniqueItems }),
          ...(format && { format }),
          ...(description && { description }),
          ...(enumVal && { enum: enumVal }),
          ...(enumNames && { enumNames })
        };

        // Radio, Select and Textarea fields need to set a new uiState
        const newWidget = () => {
          switch (key) {
            case 'select':
              return { 'ui:placeholder': '...seleciona' };
            case 'text':
              return { 'ui:placeholder': '...campo de texto' };
            case 'number':
              return { 'ui:placeholder': '...12345' };
            case 'email':
              return {
                'ui:placeholder': '...my@email.cl',
                'ui:widget': 'emailAutocompleteWidget'
              };
            case 'rut':
              return { 'ui:placeholder': '...12.444.555-0' };
            case 'radio':
              return { 'ui:widget': 'radio' };
            case 'textarea':
              return {
                'ui:widget': 'textarea',
                'ui:placeholder': '...area de texto'
              };
            case 'checkboxes':
              return { 'ui:widget': 'checkboxes' };
            default:
              break;
          }
        };

        const id = getShortid();
        addElement(id, newElement, newWidget(), source, destination);
        break;
      default:
        moveElement(source, destination)
        break;
    }
  };

  return (
    <Fragment>
      <div id='formbuilder'>
        <DragDropContext onDragEnd={onDragEnd}>
          <ToolKit toolkitSchema={toolkitSchema} />
          <Canvas form={form} />
        </DragDropContext>
        <JsonViewer form={form} />
      </div>
    </Fragment>
  );
};

Formbuilder.propTypes = {
  addElement: PropTypes.func.isRequired,
  reorderElement: PropTypes.func.isRequired,
  moveElement: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps, {
  addElement,
  reorderElement,
  moveElement
})(Formbuilder);
