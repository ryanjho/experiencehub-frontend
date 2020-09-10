import React, { Component } from 'react';
import experienceService from '../services/experienceService';
import { Spinner } from 'react-bootstrap';

export class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: null
        }
    }

    async fetchExperience() {
        const experience = await experienceService.getOneById(this.props.experienceId);
        console.log(experience);
        this.setState({
            experience: experience
        })
    }

    async componentDidMount() {
        await this.fetchExperience();
    }

    render() {
        return (
            <div className="container">
                { this.state.experience ? 
                <React.Fragment>
                    <h1>{this.state.experience.name}</h1> 
                    <img src={this.state.experience.image} />
                    <h4>Price:</h4> 
                    <p>${this.state.experience.price}</p> 
                    <h4>Description:</h4> 
                    <p>{this.state.experience.description}</p> 
                    <h4>Address:</h4> 
                    <p>{this.state.experience.address}</p> 
                </React.Fragment>
                
                : <Spinner animation="grow" />}
            </div>
        )
    }
}

export default Experience
