import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteElement, deleteUiOrder, deleteWidget } from '../../../actions/form';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// TODO:
// Move inline css to styles file
// fix delete icon position in form title
// show only form title

const FieldTemplate = (
    props
) => {
    const { id, label, required, description, children, formContext, deleteElement, deleteUiOrder, deleteWidget } = props;

    const element = id.split('_');
    const elementId = element[1];

    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-between', userSelect: 'none' }}>
                {
                    id !== 'root' && (
                        <Fragment>
                            <label>{label} {required ? "*" : null}</label>
                            <div>
                                <Link to={`/formbuilder/${formContext.idPrefix}/${elementId}`}>
                                    < i className="fas fa-edit"></i>
                                </Link>
                                <Link to="#!">
                                    <i onClick={() => {
                                        deleteElement(elementId, formContext.idPrefix);
                                        deleteUiOrder(elementId, formContext.idPrefix);
                                        deleteWidget(elementId, formContext.idPrefix);
                                    }} className="fas fa-trash-alt"></i>
                                </Link>
                            </div>
                        </Fragment>
                    )
                }

            </div >
            {children}
            {id !== 'root' && (description)}
        </Fragment>
    )
};

FieldTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    description: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    deleteElement: PropTypes.func.isRequired,
    deleteUiOrder: PropTypes.func.isRequired,
    deleteWidget: PropTypes.func.isRequired,
};

// export default connect(null, { deleteElement })(CanvasElementTemplate);

// Add a wrapped to return a class component to prevent warning
// Source: https://github.com/rjsf-team/react-jsonschema-form/issues/1309
var ReduxWrapped = connect(null, { deleteElement, deleteUiOrder, deleteWidget })(FieldTemplate);
class FieldTemplateWrapper extends React.Component {
    render() {
        return (
            <ReduxWrapped {...this.props} />
        )
    }
}
export default FieldTemplateWrapper