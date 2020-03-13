import React, { Fragment } from 'react';
import JSONPretty from 'react-json-pretty';
import PropTypes from 'prop-types'

const JsonViewer = ({ form }) => {

    return (
        <Fragment>
            <div id="json-viewer" className="well">
                <fieldset>
                    <legend>Esquema JSON</legend>
                    <JSONPretty id="json-pretty" data={form}></JSONPretty>
                </fieldset>
            </div>
        </Fragment>
    )
};


JsonViewer.propTypes = {
    form: PropTypes.any.isRequired
};

export default JsonViewer;
