import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
  class Auth extends Component {

    // This component protects the routes that one can't
    // access before logging in. 
    componentWillMount() {
      if (!localStorage.getItem('access_token')) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.localStorage.getItem('access_token')) {
        this.props.history.push('/');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  return Auth;
}