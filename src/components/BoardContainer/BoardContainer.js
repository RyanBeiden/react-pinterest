import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';
import smash from '../../helpers/data/smash';

import './BoardContainer.scss';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
    formOpen: false,
  }

  getBoards = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('Getting the boards broke -> ', err));
  }

  componentDidMount() {
    this.getBoards();
  }

  deleteBoard = (boardId) => {
    smash.deleteBoardWithPins(boardId)
      .then(() => {
        this.getBoards();
      })
      .catch((err) => console.error('Getting the boards broke -> ', err));
  }

  createBoard = (newBoard) => {
    boardsData.createBoard(newBoard)
      .then(() => {
        this.getBoards();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Creating a new board did not work -> ', err));
  }

  render() {
    const { boards, formOpen } = this.state;
    const { setSingleBoard } = this.props;

    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard}/>);

    return (
      <div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mt-4 mr-4" onClick={() => { this.setState({ formOpen: !formOpen }); }}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        { formOpen ? <BoardForm createBoard={this.createBoard}/> : ''}
        <div className="BoardContainer d-flex justify-content-center flex-wrap p-2">
          {boardCard}
        </div>
      </div>
    );
  }
}

export default BoardContainer;
