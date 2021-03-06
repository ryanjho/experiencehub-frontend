import React, { Component } from 'react';

export class About extends Component {
    render() {
        return (
            <div className="container">
                <h2>About Us</h2>
                <img className="about-us-image" src="https://blog.virtuoso.com/wp-content/uploads/2016/04/WhyPeopleTravel_main.jpg" alt="About Experience Hub"/>
                <p>Experience Hub is an online platform that allows you to find and book unique experiences and activities around the world.</p>
                <p>This application allows you to sign up for a profile, search for interesting experiences and send an enquiry to the merchant behind the experience.</p>
                <p>Experience Hub is proudly brought to you by <a href="https://github.com/ryanjho">Ryan Ho</a>, the best up and coming software engineer in Singapore and Southeast Asia.</p>
            </div>
        )
    }
}

export default About
