import React, { Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const Content = ({ element }) => {
    switch (element) {
        case 'button':
            return (
                <button className="btn-primary">Boton</button>
            )
        case 'checkbox':
            return (
                <Fragment>
                    <input type="checkbox" disabled checked />
                    <span>Checkbox 1</span>
                </Fragment>
            )
        case 'email':
            return (
                <input type="email" disabled placeholder="Email..." />
            )
        case 'date':
            return (
                <input type="date" disabled />
            )
        case 'number':
            return (
                <input type="number" disabled placeholder="Numero..." />
            )
        case 'paragraph':
            return (
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                    vero neque tempora doloribus laboriosam dolore beatae itaque
                    iure voluptatem distinctio.
              </p>
            )
        case 'radio':
            return (
                <Fragment>
                    <input type="radio" disabled checked />
                    <span>Radio 1</span>
                </Fragment>
            )
        case 'select':
            return (
                <select disabled>
                    <option value="">Seleciona...</option>
                </select>
            )
        case 'submit':
            return (
                <button class="btn-primary" type="submit">Submit</button>
            )
        case 'textarea':
            return (
                <textarea disabled placeholder="Textarea..."></textarea>
            )
        case 'text':
            return (
                <input type="text" disabled placeholder="Texto..." />
            )
        default:
            break;
    }
}

const CanvasElement = ({ item, index }) => {
    return (
        <Draggable index={index} draggableId={item.id}>
            {(provided, snapshot) => (

                <div className="form-group field field-string"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <label className="control-label" for="root_email">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        id="root_email"
                        label="Email"
                        disabled
                    />
                </div>

                /** 
                < div
                    className="form-group"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div className="form-heading">
                        <label htmlFor="">{item.name}</label>
                        <div className="form-tools">
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash-alt"></i>
                            <i {...provided.dragHandleProps} className="fas fa-arrows-alt"></i>
                        </div>
                    </div>
                    <div className="form-content">
                        <Content element={item.key} />
                    </div>
                </div>
                */
            )
            }
        </Draggable >
    )
}

CanvasElement.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
}

export default CanvasElement





{
    /* 
    
    function CustomFieldTemplate(props) {
      const {id, classNames, label, help, required, description, errors, children} = props;
      return (
        <div className={classNames}>
          <label htmlFor={id}>{label}{required ? "*" : null}</label>
          {description}
          {children}
          {errors}
          {help}
        </div>
      );
    }
    
    <div class="form-group field field-string">
    <label class="control-label" for="root_email">Email</label
    ><input
        class="form-control"
        type="email"
        id="root_email"
        label="Email"
        disabled
    />
    </div>
    
    class
    type
    label
    id 
    */
}