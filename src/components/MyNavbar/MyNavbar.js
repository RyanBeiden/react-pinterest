import React from 'react';
import PropTypes from 'prop-types';

import './MyNavbar.scss';
import Auth from '../Auth/Auth';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  render() {
    const { authed } = this.props;

    return (
      <nav className="MyNavbar navbar navbar-light bg-light">
        <h1 className="navbar-brand"><i className="fab fa-pinterest-square"></i>interest</h1>
        <form className="form-inline">
          <Auth authed={authed}/>
        </form>
      </nav>
    );
  }
}

export default MyNavbar;
