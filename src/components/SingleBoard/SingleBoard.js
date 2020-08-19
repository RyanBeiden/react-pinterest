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

  componentDidMount() {
    const { boardId } = this.props;

    boardsData.getSingleBoard(boardId)
      .then((response) => this.setState({ board: response.data }))
      .catch((err) => console.error('Getting the single board failed -> ', err));

    pinsData.getPinsByBoardId(boardId)
      .then((response) => this.setState({ pins: response }))
      .catch((err) => console.error('Getting the pins by boardId did not work -> ', err));
  }

  render() {
    const { board, pins } = this.state;
    const { setSingleBoard } = this.props;

    const pinCard = pins.map((pin) => <Pin key={pin.id} pin={pin}/>);

    return (
      <div>
        <div className="d-flex justify-content-start mt-4 ml-4">
          <button className="btn btn-secondary" onClick={() => { setSingleBoard(''); }}>Back</button>
        </div>
        <h2>{board.boardName}</h2>
        <div className="d-flex justify-content-center flex-wrap align-items-start">
          {pinCard}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
