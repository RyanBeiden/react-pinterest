import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    createPin: PropTypes.func.isRequired,
  }

  state = {
    pinName: '',
    imageUrl: '',
  }

  changePinNameEvent = (e) => {
    e.preventDefault();
    this.setState({ pinName: e.target.value });
  }

  changeImageUrlEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { pinName, imageUrl } = this.state;
    const { boardId, createPin } = this.props;

    const newPin = {
      pinName,
      imageUrl,
      boardId,
      uid: authData.getUid(),
    };

    createPin(newPin);
  }

  render() {
    return (
      <form className="col-6 offset-3">
      <div className="form-group mt-1">
        <label htmlFor="pinName">Pin Name</label>
        <input
          type="text"
          className="form-control"
          id="pinName"
          placeholder="Enter Pin Name"
          onChange={this.changePinNameEvent}
          />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="imageUrl">Pin Image</label>
        <input
          type="text"
          className="form-control"
          id="imageUrl"
          placeholder="Enter a Pin URL"
          onChange={this.changeImageUrlEvent}
          />
      </div>
      <button className="btn btn-dark mb-4" onClick={this.savePinEvent}>Save Pin</button>
    </form>
    );
  }
}

export default PinForm;
