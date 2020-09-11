import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import bsCustomFileInput from 'bs-custom-file-input';
import experienceService from '../services/experienceService';
import imagesService from '../services/imagesService';

class NewExperienceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            description: '',
            address: '',
            createNewExperience: false,
            imageFile: null
        }
    }

    handleChange = event => {
        if (event.target.id === 'image') {
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


        const newExperience = await {
            name: this.state.name,
            price: this.state.price,
            description: this.state.description,
            address: this.state.address,
            image: imageUrl,
            merchantId: this.props.merchant._id
        }

        // Add New Experience To Database
        const response = await this.createNewExperience(newExperience);

        if (response.error) {
            this.setState({
                error: response.error
            })
        } else {
            this.setState({
                name: '',
                price: 0,
                address: '',
                createNewExperience: true,
                imageFile: null
            })
        }

    }

    createNewExperience = async (data) => {
        return await experienceService.create(data);
    }

    uploadImage = async files => {
        const response = await imagesService.uploadImageCloudinary(files);
        return response.secure_url;
    }

    componentDidMount() {
        bsCustomFileInput.init();
    }

    render() {
        return (
            <div className="container">
                {!this.props.merchantLoginStatus ? <Redirect to="/" /> : '' }
                {this.state.createNewExperience ? <Redirect to="/" /> : ''}
                <h1>Create New Experience</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Experience Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Experience Name" required onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price" min="1" required onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Experience Description</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Enter Experience Description" required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Experience Image</Form.Label>
                        <Form.File
                            id="image"
                            label="Choose File"
                            custom
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Experience Address" required onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Create Experience</Button>
                </Form>
            </div>
        )
    }
}

export default NewExperienceForm
