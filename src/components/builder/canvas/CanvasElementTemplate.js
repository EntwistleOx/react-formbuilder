import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteElement, deleteUiOrder, deleteWidget } from '../../../actions/form';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const CanvasElementTemplate = (
    props
) => {

    const {
        id,
        classNames,
        label,
        required,
        children,
        description,
        deleteElement,
        deleteUiOrder,
        deleteWidget,
        rawDescription,
        uiState
    } = props

    // Get prop id and split 'root_'
    const element = id.split('_');
    const elementId = element[1];

    const [order, setOrder] = useState(0);

    useEffect(() => {
        setOrder(uiState.findIndex(el => el === elementId))
    }, [uiState, elementId])

    const onDelete = () => {
        deleteElement(elementId);
        deleteUiOrder(elementId);
        deleteWidget(elementId);
    }

    console.log(props)
    return (
        (id === 'root') ? (
            <Fragment>
                <div style={{
                    position: 'relative',
                    marginLeft: '97%',
                    top: '26px',
                    marginTop: '-2rem'
                }}>
                    <div>
                        <Link to={`/${id}`}>
                            <i className="fas fa-edit"></i>
                        </Link>
                    </div>
                </div>
                {children}
            </Fragment>
        ) : (
                <Draggable index={order} draggableId={id} isDragDisabled={id === 'root' ? true : false}>
                    {(provided, snapshot) => (
                        <div
                            className={classNames}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', userSelect: 'none' }}>
                                <label htmlFor={id}>{label} {required ? "*" : null}</label>
                                <div>
                                    <Link to={`/${elementId}`}>
                                        <i className="fas fa-edit"></i>
                                    </Link>

                                    <Link to="#!">
                                        <i onClick={onDelete} className="fas fa-trash-alt"></i>
                                    </Link>
                                    <i {...provided.dragHandleProps} className="fas fa-arrows-alt"></i>
                                </div>
                            </div>
                            {children}
                            {description && description}
                        </div>
                    )
                    }
                </Draggable >
            )
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
    deleteUiOrder: PropTypes.func.isRequired,
    deleteWidget: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    uiState: state.form.uiSchema["ui:order"]
})

// export default connect(null, { deleteElement })(CanvasElementTemplate);

// Add a wrapped to return a class component to prevent warning
// Source: https://github.com/rjsf-team/react-jsonschema-form/issues/1309
var ReduxWrapped = connect(mapStateToProps, { deleteElement, deleteUiOrder, deleteWidget })(CanvasElementTemplate);
class CanvasElementTemplateWrapper extends React.Component {
    render() {
        return (
            <ReduxWrapped {...this.props} />
        )
    }
}
export default CanvasElementTemplateWrapper