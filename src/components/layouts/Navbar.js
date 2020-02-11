import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const links = (
        <ul>
            <li><Link to='/forms'>Forms</Link></li>
            <li><Link to='/formbuilder'>Form Builder</Link></li>
            <li><Link to='/formrender'>Form Render</Link></li>
        </ul>
    );

    return (
        <nav className="navbar">
            {links}
        </nav>
    )
}

export default Navbar
