import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../../redux/actions/userActions'

import './Header.scss'

const Header = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin   

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/login')
    }

    return (
        <header>
            <nav className='page-nav'>
                <div className="container">
                    <Link to="/"><h2>DENDENSHOP</h2></Link>
                    <ul>
                        <li>
                            <Link to="/cart"><i className='fas fa-shopping-cart'></i> Cart</Link>
                        </li>
                        <li>
                            {!userInfo? <Link to="/login"><i className='fas fa-user'></i> Sign In</Link> : (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                            
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default withRouter(Header);