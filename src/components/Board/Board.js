import React from 'react';
import PropTypes from 'prop-types';

import boardShape from '../../helpers/props/boardShape';
import '../Board/Board.scss';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
  }

  singleBoardClick = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="card text-center">
        <div className="card-header">{board.boardName}</div>
        <div className="card-body">
          <h6 className="card-title">{board.description}</h6>
          <button className="btn btn-danger" onClick={this.singleBoardClick}>View Pins</button>
        </div>
      </div>
    );
  }
}

export default Board;
