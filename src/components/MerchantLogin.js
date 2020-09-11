// Dependencies
import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import sessionsService from '../services/sessionsService';

class MerchantLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState( {
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        const merchant = {
            email: this.state.email,
            password: this.state.password
        }
        const response = await sessionsService.merchantLogin(merchant);
        if (response.error) {
            this.setState({error: response.error})
        } else {
            localStorage.setItem('merchant', JSON.stringify(response))
            await this.props.merchantLogin(response);
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Merchant Login</h1>
                { this.state.error ? <Alert variant="danger">{this.state.error}</Alert> : ''}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email" onChange={this.handleChange}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group controlId="password" onChange={this.handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                { this.props.merchantLoginStatus ? <Redirect to="/merchants/dashboard" /> : ''}
            </div>
        )
    }
}

export default MerchantLogin
