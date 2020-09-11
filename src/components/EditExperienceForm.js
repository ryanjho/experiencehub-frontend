import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';

class EditExperienceForm extends Component {
    componentDidMount() {
        bsCustomFileInput.init();
    }

    render() {
        const { name, price, description, address } = this.props.editingMerchant;
        const handleEditFormChange = this.props.handleEditFormChange;
        const handleEditFormSubmit = this.props.handleEditFormSubmit;
        return (
            <div className="container">
                <h1>Update Experience</h1>
                <Form onSubmit={handleEditFormSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Experience Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Experience Name" value={name} required onChange={handleEditFormChange} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price" value={price} min="1" required onChange={handleEditFormChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Experience Description</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Enter Company Description" value={description} required onChange={handleEditFormChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Experience Image</Form.Label>
                        <Form.File
                            id="image"
                            label="Choose File"
                            custom
                            onChange={handleEditFormChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Experience Address" value={address} required onChange={handleEditFormChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Update Experience</Button>
                </Form>
            </div>
        )
    }
}

export default EditExperienceForm
