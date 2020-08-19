import React from 'react';

import pinShape from '../../helpers/props/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static = {
    pins: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card Pin">
        <img className="card-img-top" src={pin.imageUrl} alt="Card Cap" />
        <div className="card-body">
          <h5 className="card-title mb-0 pb-0">{pin.pinName}</h5>
        </div>
      </div>
    );
  }
}

export default Pin;
