import React from 'react';
import PropTypes from 'prop-types';
import Drops from './Drops';
import '../styles/main.scss';
import clusterSketch from './Cluster';
import P5Wrapper from './P5Wrapper';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
    render() {
        return (
            <div id="app-component">
                {/* <Drops/> */}
                {/* <Cluster /> */}
                <P5Wrapper sketch={clusterSketch} />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;