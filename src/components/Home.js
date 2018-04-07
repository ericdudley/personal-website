import React from "react";
import '../styles/main.scss';
import '../styles/home.scss';
import { Link } from 'react-router';
class Home extends React.Component {
    render() {
        let apps = [
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/eric-dudley-894721106',
                icon: 'linkedin',
                same_page: false
            },
            {
                name: 'GitLab',
                url: 'https://gitlab.com/ericdudley/personal-website',
                icon: 'gitlab',
                same_page: false
            },
            {
                name: 'Email',
                url: 'mailto:ericdudley@email.com',
                icon: 'envelope',
                same_page: false
            },
            {
                name: 'GitHub',
                url: 'https://github.com/ericdudley',
                icon: 'github',
                same_page: false
            },
            {
                image: '../images/me.jpg'
            },
            {
                name: 'Flickr',
                url: 'https://www.flickr.com/photos/ericdudley',
                icon: 'flickr',
                same_page: false
            },
            {
                name: 'Stretch',
                url:
                    '/stretch',
                icon: 'man',
                same_page: true
            }
        ];

        let apps_markup = [];
        for (let app of apps) {
            apps_markup.push(
                <a href={app.url} target={app.same_page ? "_self" : "_blank"}>
                    <div className="app-wrapper">
                        {app.image &&
                            <div className="app-image"></div>
                        }{app.icon &&
                            <div><i className={"app-icon fa fa-" + app.icon}></i>
                                <span className="app-name">{app.name}</span></div>
                        }
                    </div>
                </a>
            );
        }




        return (
            <div id="home">
                <section>
                    {apps_markup}
                </section>
                {/* <section>
                <div id="home-links">
                <a href="https://github.com/ericdudley" target="_blank" className="link link1">programmer</a>          
                <Link to={`/photographer`} className="link link2">photographer</Link>
                <Link to={`/tutor`} className="link link3">private tutor</Link>          
                <Link to={`/stretch`} className="link link4">stretcher</Link>
                </div>
                    <h1>eric dudley</h1>
                    <ul>
                        <li className="home-icon"><a href="https://gitlab.com/ericdudley/personal-website" target="_blank"><i className="fa fa-5x fa-gitlab" /></a></li>
                        <li className="home-icon"><a href="https://instagram.com/ericdudleyphotography" target="_blank"><i className="fa fa-5x fa-instagram" /></a></li>
                    </ul>
                    <ul>
                        <li className="home-icon"><a href="https://www.linkedin.com/in/eric-dudley-894721106" target="_blank"><i className="fa fa-5x fa-linkedin" /></a></li>
                        <li className="home-icon"><a href="mailto:ericdudley@email.com" target="_blank"><i className="fa fa-5x fa-envelope" /></a></li>
                    </ul>
                </section> */}
            </div>
        );
    }
}

export default Home;
