import React from "react";
import { Link } from "react-router";
import GalleryImage from "./GalleryImage";
import Navigation from "./Navigation";
import "../styles/gallery.scss";
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
        let img_urls = [
            '',
            'https://farm5.staticflickr.com/4671/40345782811_946266acf4_z_d.jpg',
            'https://farm5.staticflickr.com/4768/38536175000_0206dbefb0_z_d.jpg',
            'https://farm5.staticflickr.com/4614/39058022605_125dac47f7_z_d.jpg',
            'https://farm5.staticflickr.com/4654/39074618174_5997d5f1ff_z_d.jpg',
            'https://farm5.staticflickr.com/4668/27914325389_49f087381e_z_d.jpg',
            'https://farm5.staticflickr.com/4742/27953826449_a7319f71a4_z_d.jpg',
            'https://farm5.staticflickr.com/4648/27914320439_1485814a29_z_d.jpg',
            'https://farm5.staticflickr.com/4678/28006486799_b758508e36_z_d.jpg',
            'https://farm5.staticflickr.com/4629/24824385937_76ccdcac2b_z_d.jpg'
        ]
        for (let i = 1; i <= 9; i++) {
            imgs.push(
                <GalleryImage url={img_urls[i]} num={i} key={"img" + i} />
            );
        }
        return (<div id="gallery">
            <Navigation />
            {/* <section id="heading">
                <a className="link" href="mailto:ericdudley@email.com" target="_blank">Contact Me</a>
                <p>Looking for a photographer? I am an amateur photographer looking to get some experience in shooting events, nature, and portraits. Contact me if you want your event shot or are looking for portraits.</p>
                <a href="https://www.flickr.com/photos/ericdudley" className="link" target="_blank">see more at flickr <i className="fa fa-flickr" /></a>
            </section> */}
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