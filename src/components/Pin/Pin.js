import React from 'react';

import PropTypes from 'prop-types';
import pinShape from '../../helpers/props/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static = {
    pins: pinShape.pinShape,
    deletePin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, deletePin } = this.props;
    deletePin(pin.id);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card Pin">
        <img className="card-img-top" src={pin.imageUrl} alt="Card Cap" />
        <div className="card-body">
          <h5 className="card-title mb-3 pb-0">{pin.pinName}</h5>
          <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Pin;
