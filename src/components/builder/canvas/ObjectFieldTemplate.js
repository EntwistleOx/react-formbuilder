import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteElement } from '../../../actions/form';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const ObjectFieldTemplate = ({
    title,
    description,
    properties,
    deleteElement
}) => {

    return (
        <Fragment>
            <h4>{title}</h4>
            <p>{description}</p>
            {properties.map((element, index) => (
                <Draggable
                    index={index}
                    draggableId={element.content.key}
                    key={element.content.key}
                >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label htmlFor={element.name}>{element.name}{element.required ? "*" : null}</label>
                                    <div>
                                        <Link to={`edit-form-element/${element.content.key}`}>
                                            <i className="fas fa-edit"></i>
                                        </Link>

                                        <Link to="#!">
                                            <i onClick={(e) => deleteElement(element.content.key)} className="fas fa-trash-alt"></i>
                                        </Link>

                                        <i {...provided.dragHandleProps} className="fas fa-arrows-alt"></i>
                                    </div>
                                </div>
                            }
                            {element.content}
                        </div>
                    )
                    }
                </Draggable >
            ))}
        </Fragment>
    )
};

ObjectFieldTemplate.propTypes = {
    deleteElement: PropTypes.func.isRequired,
};

// export default connect(null, { deleteElement })(ObjectFieldTemplate);

// Add a wrapped to return a class component to prevent warning:
// Warning: Failed prop type: Invalid prop `ObjectFieldTemplate` of type `object` supplied to `Form`, expected `function`.
// Source: https://github.com/rjsf-team/react-jsonschema-form/issues/1309
var ReduxWrapped = connect(null, { deleteElement })(ObjectFieldTemplate);
class ObjectFieldTemplateWrapper extends React.Component {
    render() {
        return (
            <ReduxWrapped {...this.props} />
        )
    }
}
export default ObjectFieldTemplateWrapper