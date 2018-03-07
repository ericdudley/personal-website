import React from "react";
import '../styles/main.scss';
import '../styles/home.scss';
import { Link } from 'react-router';
class Home extends React.Component {
    render() {
        return (
            <div id="home">
                <section>
                <div id="home-links">
                <a href="https://github.com/ericdudley" target="_blank" className="link link1">programmer</a>          
                <Link to={`/photographer`} className="link link2">photographer</Link>
                <Link to={`/tutor`} className="link link3">private tutor</Link>          
                <Link to={`/stretch`} className="link link4">stretcher</Link>
                </div>
                    <h1>eric dudley</h1>
                    <ul>
                        <li className="home-icon"><a href="https://github.com/ericdudley" target="_blank"><i className="fa fa-5x fa-github" /></a></li>
                        <li className="home-icon"><a href="https://instagram.com/ericdudleyphotography" target="_blank"><i className="fa fa-5x fa-instagram" /></a></li>
                    </ul>
                    <ul>
                        <li className="home-icon"><a href="https://www.linkedin.com/in/eric-dudley-894721106" target="_blank"><i className="fa fa-5x fa-linkedin" /></a></li>
                        <li className="home-icon"><a href="mailto:ericdudley@email.com" target="_blank"><i className="fa fa-5x fa-envelope" /></a></li>
                    </ul>
                </section>
            </div>
        );
    }
}

export default Home;