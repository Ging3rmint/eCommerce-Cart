import React from 'react';

import './PageBanner.scss'

const PageBanner = ({title}) => {
    return (
        <section className="page-banner">
            <div className="container">
                <h1>{title}</h1>
            </div>
        </section>
    );
}

export default PageBanner;