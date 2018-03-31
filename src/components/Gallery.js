import React from "react";
import { Link } from "react-router";
import GalleryImage from "./GalleryImage";
import Navigation from "./Navigation";
import "../styles/gallery.scss";
import "../images/1.jpg";
import "../images/2.jpg";
import "../images/3.jpg";
import "../images/4.jpg";
import "../images/5.jpg";
import "../images/6.jpg";
import "../images/7.jpg";
import "../images/8.jpg";
import "../images/9.jpg";
class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            active: false,
        };
    }
    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    }

    render() {
        let imgs = [];
        for (let i = 1; i <= 9; i++) {
            imgs.push(
                <GalleryImage num={i} key={"img" + i} />
            );
        }
        return (<div id="gallery">
            <Navigation />
            <section id="heading">
                <a className="link" href="mailto:ericdudley@email.com" target="_blank">Contact Me</a>
                <p>Looking for a photographer? I am an amateur photographer looking to get some experience in shooting events, nature, and portraits. Contact me if you want your event shot or are looking for portraits.</p>
                <a href="https://www.flickr.com/photos/ericdudley" className="link" target="_blank">see more at flickr <i className="fa fa-flickr" /></a>
            </section>
            <section id="images">
                {imgs}
            </section>
            <section id="bottom-buttons">
                <Link to={`/`} className="link back-link">
                    <i className="fa fa-arrow-left" /> back
            </Link>
            </section>
        </div>);
    }
}

export default Gallery;