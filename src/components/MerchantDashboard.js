import React, { Component } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Experiences from './Experiences';
import experienceService from '../services/experienceService';

class MerchantDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experiences: null
        }
    }

    fetchMerchantExperiences = async () => {
        try {
            const experiences = await experienceService.getAllByMerchant(this.props.merchant._id);
            this.setState({ experiences: experiences });
        } catch(err) {
            console.log(err);
        }
    }

    async componentDidMount() {
        await this.fetchMerchantExperiences();
    }

    render() {
        return (

            <div className="container">
                { this.props.merchantLoginStatus ? '' : <Redirect to="/" /> }
                <h1>Dashboard</h1>
                <LinkContainer to="/experiences/new">
                    <Button variant="success">Create Experience</Button>
                </LinkContainer>
                <Experiences title='My Experiences' experiences={this.state.experiences}/>
            </div>
        )
    }
}

export default MerchantDashboard
