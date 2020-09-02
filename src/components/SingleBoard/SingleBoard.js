import React from 'react';
import PropTypes from 'prop-types';

import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
  }

  state = {
    board: {},
    pins: [],
    formOpen: false,
    editPin: {},
  }

  goGetPins = () => {
    const { boardId } = this.props;

    pinsData.getPinsByBoardId(boardId)
      .then((response) => this.setState({ pins: response }))
      .catch((err) => console.error('Getting the pins by boardId did not work -> ', err));
  }

  componentDidMount() {
    const { boardId } = this.props;

    boardsData.getSingleBoard(boardId)
      .then((response) => this.setState({ board: response.data }))
      .catch((err) => console.error('Getting the single board failed -> ', err));

    this.goGetPins();
  }

  deletePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => {
        this.goGetPins();
      })
      .catch((err) => console.error('Delete pin failed -> ', err));
  }

  createPin = (newPin) => {
    pinsData.createPin(newPin)
      .then(() => {
        this.goGetPins();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Creating the new pin did not work -> ', err));
  }

  editAPin = (pinToEdit) => {
    this.setState({ formOpen: true, editPin: pinToEdit });
  }

  updatePin = (pinId, editedPin) => {
    pinsData.updatePin(pinId, editedPin)
      .then(() => {
        this.goGetPins();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Updating the pin did not work -> ', err));
  }

  render() {
    const {
      board,
      pins,
      formOpen,
      editPin,
    } = this.state;
    const { setSingleBoard, boardId } = this.props;

    const pinCards = pins.map((pin) => <Pin
      key={pin.id}
      pin={pin}
      deletePin={this.deletePin}
      editAPin={this.editAPin}
    />);

    return (
      <div>
        <div className="d-flex justify-content-between mt-4 ml-4">
          <button className="btn btn-secondary" onClick={() => { setSingleBoard(''); this.setState({ formOpen: false }); }}>Back</button>
          {formOpen ? <button className="btn btn-primary mr-4" onClick={() => { this.setState({ formOpen: !formOpen }); }}><i className="fas fa-times"></i></button>
            : <button className="btn btn-primary mr-4" onClick={() => { this.setState({ formOpen: !formOpen, editPin: {} }); }}><i className="fas fa-plus"></i></button>}
        </div>
        {formOpen ? <PinForm
          boardId={boardId}
          createPin={this.createPin}
          pinThatIAmEditing={editPin}
          updatePin={this.updatePin}
        /> : ''}
        <h2>{board.boardName}</h2>
        <div className="d-flex justify-content-center flex-wrap align-items-start">
          {pinCards}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
