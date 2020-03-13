import React, { useState, useEffect, Fragment } from 'react';
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
    id !== 'root' ? (
      <Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            userSelect: 'none'
          }}
        >
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
        </div>
        {children}
        {description}
      </Fragment>
    ) : (
        <Fragment>
          {children}
        </Fragment>
      )
  );
};

export default FieldTemplate;