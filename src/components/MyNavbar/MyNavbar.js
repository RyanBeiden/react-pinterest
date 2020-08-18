import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    return (
      <div className="MyNavbar">
        <nav className="navbar navbar-light bg-light">
          <h1 className="navbar-brand"><i className="fab fa-pinterest-square"></i>interest</h1>
          <form className="form-inline">
            {authed ? <button className="btn btn-danger MyNavbar__logoutButton" onClick={this.logoutClickEvent}>Logout <i className="fas fa-sign-out-alt pl-1"></i></button> : ''}
          </form>
        </nav>
      </div>
    );
  }
}

export default MyNavbar;
