import React from 'react';
import PropTypes from 'prop-types';

import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import Pin from '../Pin/Pin';

class SingleBoard extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
  }

  state = {
    board: {},
    pins: [],
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

  render() {
    const { board, pins } = this.state;
    const { setSingleBoard } = this.props;

    const pinCards = pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin}/>);

    return (
      <div>
        <div className="d-flex justify-content-start mt-4 ml-4">
          <button className="btn btn-secondary" onClick={() => { setSingleBoard(''); }}>Back</button>
        </div>
        <h2>{board.boardName}</h2>
        <div className="d-flex justify-content-center flex-wrap align-items-start">
          {pinCards}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
