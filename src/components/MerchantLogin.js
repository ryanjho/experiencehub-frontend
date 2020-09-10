// Dependencies
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export class MerchantLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            isLogin: true
        })
    }

    render() {
        return (
            <div className="container">
                { this.state.isLogin ? <Redirect to="/" /> : ''}
                <h1>Merchant Login</h1>
                <Form onSubmit={this.handleSubmit}>
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

export default MerchantLogin
