import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import imagesService from '../services/imagesService';
import merchantsService from '../services/merchantsService';
import { Redirect } from 'react-router-dom';

class MerchantSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            description: '',
            imageFile: null,
            signUp: false,
            error: null,
        }
    }

    handleChange = event => {
        if (event.target.id === 'logo') {
            this.setState({
                imageFile: event.target.files
            })
        } else {
            this.setState( {
                [event.target.id]: event.target.value
            })
        }
    }
    
    handleSubmit = async event => {
        event.preventDefault();
        

        // Get Image URL from Cloudinary
        const imageUrl = await this.uploadImage(this.state.imageFile);
        const newMerchant = await {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            description: this.state.description,
            logo: imageUrl
        }
        
        // // Add New Merchant to Database
        const response = await this.createNewMerchant(newMerchant);

        if (response.error) {
            this.setState({
                error: response.error
            })
        } else {
            this.setState({
                signUp: true,
                name: '',
                email: '',
                password: '',
                description: '',
                imageFile: null
            })
        }

    }

    createNewMerchant = async (data) => {
        return await merchantsService.create(data);
    }

    componentDidMount() {
        bsCustomFileInput.init();
    }

    uploadImage = async files => {
        const response = await imagesService.uploadImageCloudinary(files);
        return response.secure_url;
    }

    render() {
        return (
            <div className="container">          
                { this.state.signUp ? <Redirect to="/" /> : ''}
                <h1>Merchant Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Merchant Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Company Name" required onChange={this.handleChange}/>
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
                    <Form.Group controlId="description">
                        <Form.Label>Company Description</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Enter Company Description" required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Company Logo</Form.Label>
                        <Form.File
                            id="logo"
                            label="Choose File"
                            custom
                            onChange={this.handleChange}    
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Sign Up</Button>
                </Form>
            </div>
        )
    }
}

export default MerchantSignUp;

