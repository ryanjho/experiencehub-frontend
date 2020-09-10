import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import experienceService from '../services/experienceService';
import Experiences from './Experiences';
import { LinkContainer } from 'react-router-bootstrap';
import merchantsService from '../services/merchantsService';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experiences: []
        }
    }

    async fetchExperiences() {
        try {
            const experiences = await experienceService.getAll();
            this.setState({
                experiences: experiences
            });
        } catch(err) {
            console.log(err);
        }
    }

    async componentDidMount() {
        await this.fetchExperiences();
    }

    render() {
        return (
            <React.Fragment>
                <Jumbotron className="home-banner">
                    <h1>Explore Unique Experiences</h1>
                    <p>Discover and book amazing experiences and activities at exclusive prices</p>
                    <p>
                        <LinkContainer to="/about">
                            <Button variant="primary">Learn more</Button>
                        </LinkContainer>
                    </p>
                </Jumbotron>
                <Experiences experiences={this.state.experiences}/>
                
            </React.Fragment>
        )
    }
}

export default Home
