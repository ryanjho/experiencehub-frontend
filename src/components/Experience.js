import React, { Component } from 'react';
import experienceService from '../services/experienceService';
import { Button, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';
import EditExperienceForm from './EditExperienceForm';
import imagesService from '../services/imagesService';

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: null,
            editable: false,
            deleted: false,
            editForm: false,
            name: '',
            price: 0,
            description: '',
            address: '',
            imageFile: null,
            error: null
        }
    }

    fetchExperience = async () => {
        const experience = await experienceService.getOneById(this.props.experienceId);
        this.setState({
            experience: experience
        });
    }

    checkEditable = async () => {
        if (this.props.merchant._id === this.state.experience.merchantId) {
            this.setState({ editable: true });
        }
    }

    handleEditFormChange = event => {
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


    handleEditFormSubmit = async event => {
        event.preventDefault();
        
        // Get Image URL from Cloudinary
        const imageUrl = await this.uploadImage(this.state.imageFile);

        const newExperience = await {
            name: this.state.name,
            price: this.state.price,
            description: this.state.description,
            address: this.state.address,
            image: imageUrl,
            merchantId: this.state.experience.merchantId
        }

        // Update Experience In Database
        const response = await this.updateExperience(newExperience);

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
                imageFile: null,
                editForm: false,
                experience: response
            })
        }


    }

    updateExperience = async (data) => {
        return await experienceService.update(this.state.experience._id, data);
    }

    uploadImage = async files => {
        const response = await imagesService.uploadImageCloudinary(files);
        return response.secure_url;
    }

    deleteExperience = async (event) => {
        try {
            event.preventDefault();
            const response = await experienceService.delete(this.state.experience._id);
            this.setState({deleted: true});
        } catch(err) {
            console.log(err);
        }
        
    }

    toggleEditForm = async event => {
        event.preventDefault();
        this.setState({
            editForm: !this.state.editForm,
            name: this.state.experience.name,
            price: this.state.experience.price,
            description: this.state.experience.description,
            imageFile: null,
            address: this.state.experience.address
        });
    }

    async componentDidMount() {
        await this.fetchExperience();
        const merchantLoginStatus = await this.props.merchantLoginStatus;
        if (merchantLoginStatus) this.checkEditable();
    }

    render() {
        return (
            <div className="container">
                
                { this.state.deleted ? <Redirect to="/merchants/dashboard" /> : ''}
                
                { 
                    this.state.editForm ? 
            
                        <EditExperienceForm 
                            experience={this.state.experience}
                            handleEditFormChange = {this.handleEditFormChange}
                            editingMerchant={this.state}
                            handleEditFormSubmit = {this.handleEditFormSubmit}
                        />
                    
                    : 
                        ''
                }
                <React.Fragment>
                    {this.state.experience ?
                        <React.Fragment>
                            <React.Fragment>
                                {
                                    this.state.editable ?
                                    <React.Fragment>
                                        
                                        <Button variant="warning" className='merchant-button-nav' onClick={this.toggleEditForm}>Edit</Button>
                                        <Button variant="danger" className='merchant-button-nav' onClick={this.deleteExperience}>Delete</Button>
                                    </React.Fragment>

                                    : ''
                                }
                            </React.Fragment>
                            <h1>{this.state.experience.name}</h1>
                            <img src={this.state.experience.image} alt={this.state.experience.name} />
                            <h4>Price:</h4>
                            <p>${this.state.experience.price}</p>
                            <h4>Description:</h4>
                            <p>{this.state.experience.description}</p>
                            <h4>Address:</h4>
                            <p>{this.state.experience.address}</p>
                        </React.Fragment>
                        : <Spinner animation="grow" />
                    }
                </React.Fragment>
            </div>
        )
    }
}

export default Experience
