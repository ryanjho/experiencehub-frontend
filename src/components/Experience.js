import React, { Component } from 'react';
import experienceService from '../services/experienceService';
import { Button, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';

export class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: null,
            editable: false,
            deleted: false,
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

    deleteExperience = async (event) => {
        try {
            event.preventDefault();
            const response = await experienceService.delete(this.state.experience._id);
            this.setState({deleted: true});
        } catch(err) {
            console.log(err);
        }
        
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
                <React.Fragment>
                    {this.state.experience ?
                        <React.Fragment>
                            <React.Fragment>
                                {
                                    this.state.editable ?
                                    <React.Fragment>
                                        <LinkContainer to={`/experiences/${this.props.experienceId}/edit`}>
                                            <Button variant="warning">Edit</Button>
                                        </LinkContainer>
                                        <Button variant="danger" onClick={this.deleteExperience}>Delete</Button>
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
