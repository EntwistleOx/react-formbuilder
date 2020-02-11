import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import ToolkitElement from './ToolkitElement';
import PropTypes from 'prop-types';

const Toolkit = ({ toolkitElements }) => {
    return (
        <Droppable droppableId="ToolkitItems" isDropDisabled={true}>
            {(provided, snapshot) => (
                <div id="formbuilder-toolkit"
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                >
                    {toolkitElements.map((item, index) => (
                        <ToolkitElement key={item.id} item={item} index={index} />
                    ))}
                </div>
            )}
        </Droppable>
    )
}

Toolkit.propTypes = {
    toolkitElements: PropTypes.array.isRequired,
}

export default Toolkit
