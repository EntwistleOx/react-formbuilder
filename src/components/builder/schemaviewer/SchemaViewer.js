import React, { Fragment } from 'react';
import JSONPretty from 'react-json-pretty';
import PropTypes from 'prop-types'

const SchemaViewer = ({ form }) => {

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


SchemaViewer.propTypes = {
    form: PropTypes.any.isRequired
};

export default SchemaViewer;
