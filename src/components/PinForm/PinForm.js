import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    createPin: PropTypes.func.isRequired,
    pinThatIAmEditing: PropTypes.object.isRequired,
    updatePin: PropTypes.func.isRequired,
  }

  state = {
    pinName: '',
    imageUrl: '',
    isEditing: false,
  }

  componentDidMount() {
    const { pinThatIAmEditing } = this.props;
    if (pinThatIAmEditing.pinName) {
      this.setState({
        pinName: pinThatIAmEditing.pinName,
        imageUrl: pinThatIAmEditing.imageUrl,
        boardId: pinThatIAmEditing.boardId,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevPin = prevProps.pinThatIAmEditing;
    const incomingPin = this.props.pinThatIAmEditing;

    if (prevPin.pinName !== incomingPin.pinName) {
      this.setState({
        pinName: incomingPin.pinName || '',
        imageUrl: incomingPin.imageUrl || '',
        boardId: incomingPin.boardId || '',
        isEditing: !!incomingPin.pinName,
      });
    }
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

  editPinEvent = (e) => {
    e.preventDefault();
    const { pinName, imageUrl } = this.state;
    const { updatePin, pinThatIAmEditing, boardId } = this.props;

    const myPinWithChanges = {
      pinName,
      imageUrl,
      boardId,
      uid: authData.getUid(),
    };

    updatePin(pinThatIAmEditing.id, myPinWithChanges);
  }

  render() {
    const { isEditing, pinName, imageUrl } = this.state;

    return (
      <form className="col-6 offset-3">
      <div className="form-group mt-1">
        <label htmlFor="pinName">Pin Name</label>
        <input
          type="text"
          className="form-control"
          id="pinName"
          value={pinName}
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
          value={imageUrl}
          placeholder="Enter a Pin URL"
          onChange={this.changeImageUrlEvent}
          />
      </div>
      { isEditing
        ? <button className="btn btn-dark mb-4" onClick={this.editPinEvent}>Update Pin</button>
        : <button className="btn btn-dark mb-4" onClick={this.savePinEvent}>Save Pin</button>
      }
    </form>
    );
  }
}

export default PinForm;
