import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import usersService from '../services/usersService';
import { Redirect } from 'react-router-dom';

export class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: null,
            signUp: false
        }
    }

    handleChange = async event => {
        this.setState( { [event.target.id]: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        // Add New User To Database
        const response = await this.createNewUser(data);

        if (response.error) {
            this.setState({
                error: response.error
            })
        } else {
            this.setState({
                signUp: true,
                name: '',
                email: '',
                password: ''
            })
        }
    }

    createNewUser = async (newUser) => {
        return await usersService.create(newUser);
    }

    render() {
        return (
            <div className="container">
                { this.state.signUp ? <Redirect to="/users/login" /> : ''}
                <h1>New User Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required onChange={this.handleChange} />
                    </Form.Group>

                    { this.state.error ? <Alert variant="danger">{this.state.error}</Alert> : ''}

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Sign Up</Button>
                </Form>
            </div>
        )
    }
}

export default UserSignUp
