import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';
import { CookiesProvider } from 'react-cookie';

function logPageView() {
    if (typeof window.ga === 'function') {
        window.ga('set', 'page', location.pathname + location.search);
        window.ga('send', 'pageview');
    }
}

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <CookiesProvider>
                <Provider store={store}>
                    <Router history={history} routes={routes} onUpdate={logPageView}/>
                </Provider>
            </CookiesProvider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};