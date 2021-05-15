import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.scss'

const Footer = () => {
    return(
        <footer className="page-footer">
            <div className="container">
                <div className="page-footer__description">
                    <h2>DENDENSHOP</h2>
                    <p className="page-footer__description--text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, mi vitae malesuada efficitur, enim turpis hendrerit velit, non molestie augue risus non orci. Etiam lobortis odio leo, vel semper odio gravida eget. Proin euismod erat at sagittis molestie. Nunc at elit nec magna convallis fringilla. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus</p>
                    <p>Copyright 2021. All Rights Reserved</p>
                </div>
                <nav>
                    <ul className="page-footer__socialMedia">
                        <li>
                            <Link to="/#" title="Facebook">
                                <i className="fab fa-facebook-square"></i>
                                <span className="sr-only">Facebook</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#" title="Twitter">
                                <i className="fab fa-twitter-square"></i>
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/#" title="Instagramcdcd">
                                <i className="fab fa-instagram-square"></i>
                                <span className="sr-only">Instagram</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;