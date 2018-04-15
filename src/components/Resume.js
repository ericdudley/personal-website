import React from "react";
import '../styles/main.scss';
import '../styles/resume.scss';
import { Link } from 'react-router';
import Navigation from "./Navigation";
class Resume extends React.Component {

    constructor() {
        super();
        this.EMBED_LINK = 'https://resume.creddle.io/embed/gou28joi3b';
        this.EXTERNAL_LINK = 'https://resume.creddle.io/resume/gou28joi3b';
        this.redirecting = false;
    }
    componentWillMount() {
        if (window.innerWidth <= 850) {
            this.redirecting = true;
            window.location.replace(this.EXTERNAL_LINK);
        }
    }

    render() {
        return (
            <div id="resume">
                <Navigation />
                <section>
                    <iframe src={this.EMBED_LINK}
                        seamless>
                        <span className="btn">Loading...</span>
                    </iframe>
                    <a className="btn" href={this.EXTERNAL_LINK}>
                        {this.redirecting ? 'Redirecting...' : 'View Resume'}</a>
                </section>
            </div>
        );
    }
}

export default Resume;
