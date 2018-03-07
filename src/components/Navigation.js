import React from "react";
import { Link } from "react-router";
import '../styles/navigation.scss';

class Navigation extends React.Component {
    render(){
        return (
            <nav>
                <Link to={'/'}><h1 className="fadeDown">eric dudley</h1></Link>
            </nav>
        );
    }
}

export default Navigation;