import React from 'react'
import PropTypes from 'prop-types'

const CanvasElementTemplate = ({
    id, classNames, label, help, required, description, errors, children
}) => {
    return (
        <div className={classNames}>
            {
                id !== 'root' ?
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label htmlFor={id}>{label}{required ? "*" : null}</label>
                        <div>
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash-alt"></i>
                            <i className="fas fa-arrows-alt"></i>
                        </div>
                    </div>
                    : ''
            }
            {children}
            {id !== 'root' ? description : ''}
        </div >
    );
}

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