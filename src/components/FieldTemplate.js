import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const FieldTemplate = props => {
  const {
    id,
    label,
    required,
    description,
    children,
  } = props;

  const element = id.split('_');
  const elementId = element[1];

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}
      >
        {id !== 'root' && (
          <Fragment>
            <label>
              {label} {required ? '*' : null}
            </label>
            <div>
              <Link to={`/formbuilder/element/${elementId}`}>
                <i className='fas fa-edit'></i>
              </Link>
              <Link to='#!'>
                <i onClick={() => props.formContext.fnDeleteElement(elementId)} className='fas fa-trash-alt'></i>
              </Link>
            </div>
          </Fragment>
        )}
      </div>

      {children}

      {id !== 'root' && description}
    </Fragment>
  );
};

export default FieldTemplate;