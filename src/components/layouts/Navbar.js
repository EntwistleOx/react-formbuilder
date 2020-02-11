import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const links = (
        <ul>
            <li><Link to='/forms'>Forms</Link></li>
            <li><Link to='/formrender'>FormRender</Link></li>
        </ul>
    );

    return (
        <nav>
            {links}
        </nav>
    )
}

export default Navbar
