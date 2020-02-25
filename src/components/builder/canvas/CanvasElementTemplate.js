import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteElement, deleteUiOrder, deleteWidget, deleteFormElement } from '../../../actions/form';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// TODO:
// Move inline css to styles file
// fix delete icon position in form title
// show only form title

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
        deleteFormElement,
        form
    } = props

    // Get prop id and split 'root_'
    const element = id.split('_');
    const elementId = element[1];

    const [order, setOrder] = useState(0);

    useEffect(() => {
        form.forEach((form) => {
            const result = form.uiSchema["ui:order"].findIndex(el => el === elementId)
            if (result !== -1) setOrder(result)
        })
    }, [form, elementId])

    const onDelete = () => {
        deleteElement(elementId, props.formContext.idPrefix);
        deleteUiOrder(elementId, props.formContext.idPrefix);
        deleteWidget(elementId, props.formContext.idPrefix);
    }

    return (
        (id === 'root') ? (
            <Fragment>
                <div style={{
                    position: 'relative',
                    marginLeft: '94%',
                    top: '26px',
                    marginTop: '-2rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', userSelect: 'none' }}>
                        <Link to={`/formbuilder/${props.schema.idPrefix}/${props.schema.idPrefix}`}>
                            <i className="fas fa-edit"></i>
                        </Link>
                        <Link to="#!">
                            <i onClick={() => deleteFormElement(props.schema.idPrefix)} className="fas fa-trash-alt"></i>
                        </Link>
                    </div>
                </div>
                {children}
            </Fragment>
        ) : (
                <Draggable index={order} draggableId={id}>
                    {(provided, snapshot) => (
                        <div
                            className={classNames}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', userSelect: 'none' }}>
                                <label htmlFor={id}>{label} {required ? "*" : null}</label>
                                <div>
                                    <Link to={`/formbuilder/${props.formContext.idPrefix}/${elementId}`}>
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
    deleteFormElement: PropTypes.func.isRequired,
    form: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    form: state.form
})

// export default connect(null, { deleteElement })(CanvasElementTemplate);

// Add a wrapped to return a class component to prevent warning
// Source: https://github.com/rjsf-team/react-jsonschema-form/issues/1309
var ReduxWrapped = connect(mapStateToProps, { deleteElement, deleteUiOrder, deleteWidget, deleteFormElement })(CanvasElementTemplate);
class CanvasElementTemplateWrapper extends React.Component {
    render() {
        return (
            <ReduxWrapped {...this.props} />
        )
    }
}
export default CanvasElementTemplateWrapper