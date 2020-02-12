import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ToolkitElement from './ToolkitElement';
import PropTypes from 'prop-types';

const Toolkit = ({ toolkitSchema }) => {
    return (
        <Droppable key="ToolkitItems" droppableId="ToolkitItems" isDropDisabled={true}>
            {(provided, snapshot) => (
                <div id="formbuilder-toolkit"
                    ref={provided.innerRef}
                >
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
}

export default Toolkit
