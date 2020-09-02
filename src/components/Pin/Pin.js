import React from 'react';

import PropTypes from 'prop-types';
import pinShape from '../../helpers/props/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static = {
    pins: pinShape.pinShape,
    deletePin: PropTypes.func.isRequired,
    editAPin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, deletePin } = this.props;
    deletePin(pin.id);
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { pin, editAPin } = this.props;
    editAPin(pin);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card Pin">
        <img className="card-img-top" src={pin.imageUrl} alt="Card Cap" />
        <div className="card-body">
          <h5 className="card-title mb-3 pb-0">{pin.pinName}</h5>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button className="btn btn-danger" onClick={this.deletePinEvent}><i className="fas fa-times pl-2 pr-2"></i></button>
            <button className="btn btn-primary" onClick={this.editPinEvent}><i className="fas fa-pencil-alt pl-1 pr-1"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
