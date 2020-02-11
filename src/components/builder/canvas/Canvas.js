import React, { Fragment } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

// TODO:
// Add canvas item component or something
// Style borders on drag action

const Canvas = ({ formState }) => {
    console.log('check')
    console.log(formState)
    return (
        <Droppable key="Canvas" droppableId="Canvas">
            {(provided, snapshot) => (
                <div id="formbuilder-canvas">
                    <div className="form-wrap">
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {
                                formState.length
                                    ? formState.map(
                                        (item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(
                                                    provided,
                                                    snapshot
                                                ) => (
                                                        <Fragment>
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                isDragging={
                                                                    snapshot.isDragging
                                                                }
                                                                className="form-group"
                                                            >
                                                                <div className="form-heading">
                                                                    <label htmlFor="">Elemento</label>
                                                                    <div className="form-tools">
                                                                        <i className="fas fa-edit"></i>
                                                                        <i className="fas fa-trash-alt"></i>
                                                                        <i className="fas fa-arrows-alt"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="form-content">
                                                                    <input type="text" disabled placeholder="Elemento..." />
                                                                </div>
                                                            </div>
                                                        </Fragment>

                                                    )}
                                            </Draggable>
                                        )
                                    )
                                    :
                                    // !provided.placeholder && 
                                    (
                                        <Fragment>
                                            <div className="notice">
                                                Arrastra los elementos del menu aca
                                             </div>
                                        </Fragment>
                                    )}
                            {provided.placeholder}
                        </div>
                    </div>
                </div>
            )}
        </Droppable>
    )
}

Canvas.propTypes = {

}

export default Canvas
