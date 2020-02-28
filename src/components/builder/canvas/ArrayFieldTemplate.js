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

const ArrayFieldTemplate = (
    props
) => {
    const { id, classNames, label, help, required, description, errors, children } = props;
    return (
        <div>
            <h1>ASDF</h1>
            {props.items.map(element => 'element.children')}
            {props.canAdd && <button type="button" onClick={props.onAddClick}></button>}
        </div>
    );
};

// export default connect(null, { deleteElement })(CanvasElementTemplate);

// Add a wrapped to return a class component to prevent warning
// Source: https://github.com/rjsf-team/react-jsonschema-form/issues/1309
var ReduxWrapped = connect(null, { deleteElement, deleteUiOrder, deleteWidget, deleteFormElement })(ArrayFieldTemplate);
class ArrayFieldTemplateWrapper extends React.Component {
    render() {
        return (
            <ReduxWrapped {...this.props} />
        )
    }
}
export default ArrayFieldTemplateWrapper