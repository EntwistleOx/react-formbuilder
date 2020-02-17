import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteElement } from '../../../actions/form';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// TODO:
// Delete from ui:schema with element ID
// fix reorder

const CanvasElementTemplate = (
    props
) => {

    const {
        id,
        classNames,
        label,
        required,
        description,
        children,
        deleteElement,
        uiState
    } = props

    // Get prop id and split 'root_'
    const element = id.split('_');
    const elementId = element[1];

    const [order, setOrder] = useState(-1);

    useEffect(() => {
        setOrder(uiState.findIndex(el => el === elementId))
    }, [uiState, elementId])

    return (
        <Draggable index={order} draggableId={id} isDragDisabled={id === 'root' ? true : false}>
            {(provided, snapshot) => (
                <div
                    className={classNames}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    {
                        id !== 'root' ?
                            <div style={{ display: 'flex', justifyContent: 'space-between', userSelect: 'none' }}>
                                <label htmlFor={id}>{label} {id} {required ? "*" : null}</label>
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
};

const mapStateToProps = state => ({
    propertiesState: state.form.schema.properties,
    uiState: state.form.uiSchema["ui:order"]
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