import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types'

// TODO:
// dashed border in cloned element

const ToolkitElement = ({ item, index }) => {

    const Icon = () => {
        if (item.key === 'number') {
            return (
                <span className="fa-stack fa-1x number-icon">
                    <strong className="fa-stack-1x">123</strong>
                </span>
            )
        } else if (item.key === 'textarea')
            return (
                <span className="fa-stack textarea-icon">
                    <i className="far fa-square fa-stack-2x"></i>
                    <i className="fas fa-align-justify fa-stack-1x"></i>
                </span>
            )
        else {
            return (
                <i className={item.icon}></i>
            )
        }
    };

    return (
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}>
            {(provided, snapshot) => (
                <Fragment>
                    <div className="tolkit-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Icon />
                        {item.name}
                    </div>
                    {snapshot.isDragging && (
                        <div className="tolkit-item">
                            <Icon />
                            {item.name}
                        </div>
                    )}
                </Fragment>
            )}
        </Draggable>
    )
};

ToolkitElement.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default ToolkitElement
