import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const CanvasElementTemplate = ({
    id, classNames, label, help, required, description, errors, children
}) => {
    const elementId = id.split('_')[1];
    return (
        <Draggable index={0} draggableId={id}>
            {(provided, snapshot) => (
                <div
                    className={classNames}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {
                        id !== 'root' ?
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label htmlFor={id}>{label}{required ? "*" : null}</label>
                                <div>
                                    <Link to={`edit-form-element/${elementId}`}>
                                        <i className="fas fa-edit"></i>
                                    </Link>

                                    <Link to="#!">
                                        <i onClick={(e) => alert(elementId)} className="fas fa-trash-alt"></i>
                                    </Link>

                                    <i {...provided.dragHandleProps} className="fas fa-arrows-alt"></i>
                                </div>
                            </div>
                            : ''
                    }
                    {children}
                    {id !== 'root' ? description : ''}
                </div>
            )
            }
        </Draggable >
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
}

export default CanvasElementTemplate