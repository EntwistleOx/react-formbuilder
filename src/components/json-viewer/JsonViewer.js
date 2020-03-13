import React, { Fragment } from 'react';
import JSONPretty from 'react-json-pretty';
import PropTypes from 'prop-types'

const JsonViewer = ({ form, title, css }) => {

    return (
        <Fragment>
            <div id="json-viewer" className="well" style={css}>
                <legend>{title}</legend>
                <JSONPretty id="json-pretty" data={form}></JSONPretty>
            </div>
        </Fragment>
    )
};

JsonViewer.propTypes = {
    form: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    css: PropTypes.string,
};

export default JsonViewer;
