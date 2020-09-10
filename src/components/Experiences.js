import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Experiences extends Component {
    render() {
        return (
            <div className="container">
                <h2>Experiences</h2>
                <div className="container experiences">
                {this.props.experiences ?
                    this.props.experiences.map(experience => {
                        return (
                            <Card style={{ width: '18rem'}}>
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
                    : <p>Loading</p>}
                </div>
            </div >
        )
    }
}

export default Experiences
