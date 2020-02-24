import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteElement, deleteUiOrder, deleteWidget } from '../../../actions/form';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// TODO:
// Move inline css to styles file

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
        form
    } = props

    // Get prop id and split 'root_'
    const element = id.split('_');
    const elementId = element[1];

    console.log('aers', props.schema.idPrefix)
    console.log('aers', form)
    // console.log('aers', id)

    const [order, setOrder] = useState(0);

    // useEffect(() => {
    //     // setOrder(uiState.findIndex(el => el === elementId))
    // }, [uiState, elementId])

    const onDelete = () => {
        deleteElement(elementId);
        deleteUiOrder(elementId);
        deleteWidget(elementId);
    }

    console.log(form)
    return (
        form.length ?
            form.map((form, index) => {
                console.log(form, index)
                return (
                    <Draggable
                        key={id}
                        draggableId={id}
                        index={index}
                    >
                        {(provided, snapshot) => (
                            <div
                                className={classNames}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', userSelect: 'none' }}>
                                    <label htmlFor={id}>{label} {required ? "*" : null}</label>
                                    <div>
                                        <Link to={`/formbuilder/${elementId}`}>
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
            }

            ) : ''
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
    form: state.form
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