import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

import './Auth.scss';

class Auth extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    const checkUserSignIn = () => {
      if (authed) {
        return <button className="btn btn-danger Auth__logoutButton" onClick={this.logoutClickEvent}>Logout <i className="fas fa-sign-out-alt pl-1"></i></button>;
      }

      return <button className="btn btn-danger Auth__loginButton" onClick={this.loginClickEvent}><i className="fab fa-google"></i> Login</button>;
    };

    return (
      <div className="Auth">
        {checkUserSignIn()}
      </div>
    );
  }
}

export default Auth;
