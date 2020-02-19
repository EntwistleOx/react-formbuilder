import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const links = (
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/forms'>Forms</Link></li>
            <li className="breadcrumb-item"><Link to='/formbuilder'>Form Builder</Link></li>
            {/* <li className="breadcrumb-item"><Link to='/formrender'>Form Render</Link></li> */}
        </ol>
    );

    return (
        <nav className="navbar">
            {links}
        </nav>
    )
}

export default Navbar
