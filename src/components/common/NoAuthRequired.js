import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
  class NotAuth extends Component {

    // A component that always redirects the user to the 
    // dashboard as long as the user is logged in.
    // With this, a user can never access the login or
    // registration page while still logged in.   
    componentWillMount() {
      if (localStorage.getItem('access_token')) {
        this.props.history.push('/shoppinglists');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.localStorage.getItem('access_token')) {
        this.props.history.push('/shoppinglists');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  return NotAuth;
}