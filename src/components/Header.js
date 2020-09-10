import React, { Component } from 'react';
import { Button, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Header extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <LinkContainer to="/"
                    ><Navbar.Brand href="/">Experience Hub</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    { this.props.userLoginStatus || this.props.merchantLoginStatus ? '' :
                        <React.Fragment>
                            <Dropdown className="user-button-nav">
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    User
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <LinkContainer to="/users/login"><Dropdown.Item>Login</Dropdown.Item></LinkContainer>
                                    <LinkContainer to="/users/signup"><Dropdown.Item>Sign Up</Dropdown.Item></LinkContainer>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="user-button-nav">
                                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                    Merchant
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="merchant-button-nav">
                                    <LinkContainer to="/merchants/login"><Dropdown.Item>Login</Dropdown.Item></LinkContainer>
                                    <LinkContainer to="/merchants/signup"><Dropdown.Item>Sign Up</Dropdown.Item></LinkContainer>
                                </Dropdown.Menu>
                            </Dropdown>
                        </React.Fragment>
                    }

                    { this.props.userLoginStatus ? <Button onClick={this.props.userLogin} className="user-logout" variant="danger">Logout</Button> : ''}
                    
                    { this.props.merchantLoginStatus ? 
                        <React.Fragment>
                            <Button variant="success">Create Experience</Button>
                            <Button onClick={this.props.merchantLogout} className="merchant-logout" variant="danger">Log Out</Button> 
                        </React.Fragment>
                        : '' }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header
