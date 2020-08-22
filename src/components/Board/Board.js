import React from 'react';
import PropTypes from 'prop-types';

import boardShape from '../../helpers/props/boardShape';
import './Board.scss';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
  }

  singleBoardClick = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  }

  deleteBoardEvent = (e) => {
    e.preventDefault();
    const { board, deleteBoard } = this.props;
    deleteBoard(board.id);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="card text-center">
        <button className="btn btn-secondary delete-board-button" onClick={this.deleteBoardEvent}>X</button>
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
