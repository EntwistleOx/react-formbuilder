import React from 'react';
import { connect } from 'react-redux';
import { createStep } from '../../../actions/form'
import { Droppable } from 'react-beautiful-dnd';
import ToolkitItems from './ToolkitItems';
import PropTypes from 'prop-types';

// TODO:
// inline style to css file

const Toolkit = ({ toolkitSchema, createStep }) => {

    const onCreate = () => {
        createStep()
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
                        className="btn btn-default btn-sm btn-block btn-step"
                    >
                        <i className="fas fa-plus"></i> Agregar Paso
                    </a>

                    {toolkitSchema.map((item, index) => (
                        <ToolkitItems key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

Toolkit.propTypes = {
    toolkitSchema: PropTypes.array.isRequired,
    createStep: PropTypes.func.isRequired,
}

export default connect(null, { createStep })(Toolkit)
