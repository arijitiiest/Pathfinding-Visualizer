import React from 'react';

import routes from '../../data/routes';
import './Nav.css';
import Hamburger from './Hamburger';

const Nav = () => {
    const logo = routes
    .filter(data => data.index)
    .map((data, idx) => (
      <a className="header_logo-link" href={data.path} key={idx}>
        {data.label}
      </a>
    ));

    const links = routes
    .filter(data => !data.index)
    .map((data, idx) => (
      <a
        className="header_navigation-items-link"
        href={data.path}
        key={idx}
      >
        {data.label}
      </a>
    ));

    return(
        <header className="header">
      <nav className="header_navigation">
        <div className="header_logo"> {logo} </div>
        <div className="header_navigation-items">
          <ul>{links}</ul>
        </div>
      </nav>
      <div className="header_toggle-button">
        <Hamburger />
      </div>
    </header>
    )
}

export default Nav;