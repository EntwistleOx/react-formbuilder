import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { createForm } from '../../../actions/form'
import ToolkitElement from './ToolkitElement';
import PropTypes from 'prop-types';

// TODO:
// inline style to css file

const Toolkit = ({ toolkitSchema, createForm }) => {

    const onCreate = () => {
        createForm()
    }

    return (
        <Droppable key="ToolkitItems" droppableId="ToolkitItems" isDropDisabled={true} type="builder">
            {(provided, snapshot) => (

                <div id="formbuilder-toolkit"
                    className="well"
                    ref={provided.innerRef}
                >
                    <a
                        onClick={onCreate}
                        href="#"
                        style={{
                            marginBottom: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            alignContent: 'center',
                            padding: '0.5rem 0.8rem'
                        }}
                        className="btn btn-default btn-block">
                        <i className="fas fa-plus"></i> Agregar Paso</a>

                    {toolkitSchema.map((item, index) => (
                        <ToolkitElement key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

Toolkit.propTypes = {
    toolkitSchema: PropTypes.array.isRequired,
    createForm: PropTypes.func.isRequired,
}

export default connect(null, { createForm })(Toolkit)
