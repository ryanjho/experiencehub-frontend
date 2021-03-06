import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Experiences extends Component {
    render() {
        return (
            <div className="container">
                <h2>{this.props.title}</h2>
                <div className="container experiences">
                {this.props.experiences ?
                    this.props.experiences.map( (experience, index) => {
                        return (
                            <Card style={{ width: '18rem'}} key={index}>
                                <Card.Img variant="top" src={ experience.image} />
                                <Card.Body>
                                    <Card.Title>{ experience.name }</Card.Title>
                                    <Card.Text>
                                        { experience.description }
                                    </Card.Text>
                                    <LinkContainer to={`/experiences/${experience._id}`}>
                                        <Button variant="primary">Learn More</Button>
                                    </LinkContainer>
                                </Card.Body>
                            </Card>
                        )
                    })
                    : ''}
                </div>
            </div >
        )
    }
}

export default Experiences
