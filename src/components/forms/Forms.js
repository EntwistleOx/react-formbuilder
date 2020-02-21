import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types'

const Forms = props => {
    return (
        <Fragment>
            <div className="page-header" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1 >Formularios</h1>
                <Link to="/formbuilder" class="btn btn-default">Crear</Link>
            </div>
            <table class="table table-striped table-hover  form-list">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>
                            <Link to={`/formrender/id`}>
                                <i class="far fa-eye"></i>
                            </Link>

                            <Link to={`/formbuilder/id`}>
                                <i className="fas fa-edit"></i>
                            </Link>

                            <Link to="#!">
                                <i onClick={''} className="fas fa-trash-alt"></i>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>
                            <Link to={`/formrender/id`}>
                                <i class="far fa-eye"></i>
                            </Link>

                            <Link to={`/formbuilder/id`}>
                                <i className="fas fa-edit"></i>
                            </Link>

                            <Link to="#!">
                                <i onClick={''} className="fas fa-trash-alt"></i>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>
                            <Link to={`/formrender/id`}>
                                <i class="far fa-eye"></i>
                            </Link>

                            <Link to={`/formbuilder/id`}>
                                <i className="fas fa-edit"></i>
                            </Link>

                            <Link to="#!">
                                <i onClick={''} className="fas fa-trash-alt"></i>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>
                            <Link to={`/formrender/id`}>
                                <i class="far fa-eye"></i>
                            </Link>

                            <Link to={`/formbuilder/id`}>
                                <i className="fas fa-edit"></i>
                            </Link>

                            <Link to="#!">
                                <i onClick={''} className="fas fa-trash-alt"></i>
                            </Link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </Fragment>
    )
}

// Forms.propTypes = {

// }

export default Forms
