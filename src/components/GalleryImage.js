import React from "react";
import PropTypes from 'prop-types';
class GalleryImage extends React.Component {

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
        return (<img className={"gimg" + this.props.num + (this.state.active ? ' selected' : "")} src={this.props.url} onClick={this.toggleClass} />);
    }
}

GalleryImage.PropTypes = {
    num: PropTypes.number
};

export default GalleryImage;