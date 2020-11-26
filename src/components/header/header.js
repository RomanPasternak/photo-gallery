import React from 'react';

import './header.css';

const Header = () => {
    return (
        <div className="header">
            <h1>
                <a className="header-logo"
                 href="#">
                    <span>Photo Gallery</span>
                </a>
            </h1>
        </div>
    );
};

export default Header;