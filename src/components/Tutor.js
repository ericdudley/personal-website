import React from "react";
import { Link } from "react-router";
import Navigation from "./Navigation";
import "../styles/tutor.scss";
class Tutor extends React.Component{
    render(){
        return (<div id="tutor">
            <Navigation/>
            <div id="form-wrapper">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSez5iKaq3HPLxuyaanSlatcdAyjuJJFGfVSsbmy5Hpy5uia0Q/viewform?embedded=true" frameBorder="0" marginHeight="0" marginWidth="0"><p>Loading...</p></iframe>
            </div>
            <Link to={`/`} className="link back-link">
                <i className="fa fa-arrow-left"/> back
            </Link>
        </div>);
    }
}

export default Tutor;