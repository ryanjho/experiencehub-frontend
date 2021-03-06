import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export class UserLogin extends Component {
    render() {
        return (
            <div className="container">
                <h1>User Login</h1>
                <Form onSubmit={() => console.log('hello')}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />  
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default UserLogin
