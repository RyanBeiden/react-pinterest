import React from 'react';
import PropTypes from 'prop-types';

import boardShape from '../../helpers/props/boardShape';
import './Board.scss';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    editABoard: PropTypes.func.isRequired,
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

  editBoardEvent = (e) => {
    e.preventDefault();
    const { editABoard, board } = this.props;
    editABoard(board);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="card text-center m-4">
        <button className="btn btn-danger delete-board-button" onClick={this.deleteBoardEvent}><i className="fas fa-times"></i></button>
        <div className="card-header">{board.boardName}</div>
        <div className="card-body">
          <h6 className="card-title">{board.description}</h6>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button className="btn btn-secondary" onClick={this.singleBoardClick}><i className="far fa-eye pl-1 pr-1"></i></button>
            <button className="btn btn-primary" onClick={this.editBoardEvent}><i className="fas fa-pencil-alt pl-1 pr-1"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
