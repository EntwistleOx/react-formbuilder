import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteFormElement } from '../../../actions/form';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// TODO:
// Move inline css to styles file
// fix delete icon position in form title

const ObjectFieldTemplate = props => {
  const { deleteFormElement, formId } = props;

  return (
    <Fragment>
      <legend
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline'
        }}
      >
        {props.title}
        <div style={{ display: 'flex', fontSize: '15px' }}>
          <Link to={`/formbuilder/${formId}/title/${props.schema.idPrefix}`}>
            <i className='fas fa-edit'></i>
          </Link>
          <Link to='#!'>
            <i
              onClick={() => deleteFormElement(props.schema.idPrefix)}
              className='fas fa-trash-alt'
            ></i>
          </Link>
        </div>
      </legend>

      {props.properties.map((element, index) => (
        <Draggable index={index} key={element.name} draggableId={element.name}>
          {(provided, snapshot) => (
            <Fragment>
              <div
                className='well'
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {element.content}
              </div>
            </Fragment>
          )}
        </Draggable>
      ))}
    </Fragment>
  );
};

ObjectFieldTemplate.propTypes = {
  deleteFormElement: PropTypes.func.isRequired,
  props: PropTypes.object
};

const mapStateToProps = state => ({
  formId: state.form.id
});

// export default connect(null, { deleteElement })(CanvasElementTemplate);

// Add a wrapped to return a class component to prevent warning
// Source: https://github.com/rjsf-team/react-jsonschema-form/issues/1309
var ReduxWrapped = connect(mapStateToProps, { deleteFormElement })(
  ObjectFieldTemplate
);
class ObjectFieldTemplateWrapper extends React.Component {
  render() {
    return <ReduxWrapped {...this.props} />;
  }
}
export default ObjectFieldTemplateWrapper;
