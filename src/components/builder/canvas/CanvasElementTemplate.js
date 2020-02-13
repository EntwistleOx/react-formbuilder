import React from 'react';
import { connect } from 'react-redux';
import { deleteElement } from '../../../actions/form';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const CanvasElementTemplate = ({
    id, classNames, label, help, required, description, errors, children, deleteElement, propertiesState
}) => {
    const elementId = id.split('_')[1];
    const elements = Object.keys(propertiesState)
    const index = elements.indexOf(elementId)

    return (
        <Draggable index={index} draggableId={id}>
            {(provided, snapshot) => (
                <div
                    className={classNames}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {
                        id !== 'root' ?
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor={id}>{label}{required ? "*" : null}</label>
                                <div>
                                    <Link to={`edit-form-element/${elementId}`}>
                                        <i className="fas fa-edit"></i>
                                    </Link>

                                    <Link to="#!">
                                        <i onClick={(e) => deleteElement(elementId)} className="fas fa-trash-alt"></i>
                                    </Link>

                                    <i {...provided.dragHandleProps} className="fas fa-arrows-alt"></i>
                                </div>
                            </div>
                            : ''
                    }
                    {children}
                    {id !== 'root' ? description : ''}
                </div>
            )
            }
        </Draggable >
    )
};

CanvasElementTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    classNames: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    help: PropTypes.object,
    required: PropTypes.bool,
    description: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    deleteElement: PropTypes.func.isRequired,
    propertiesState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    propertiesState: state.form.schema.properties
})

// export default connect(null, { deleteElement })(CanvasElementTemplate);

// Add a wrapped to return a class component to prevent warning
// Source: https://github.com/rjsf-team/react-jsonschema-form/issues/1309
var ReduxWrapped = connect(mapStateToProps, { deleteElement })(CanvasElementTemplate);
class CanvasElementTemplateWrapper extends React.Component {
    render() {
        return (
            <ReduxWrapped {...this.props} />
        )
    }
}
export default CanvasElementTemplateWrapper