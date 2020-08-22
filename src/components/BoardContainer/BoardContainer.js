import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import Board from '../Board/Board';
import smash from '../../helpers/data/smash';
import './BoardContainer.scss';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

  componentDidMount() {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('Getting the boards broke -> ', err));
  }

  deleteBoard = (boardId) => {
    smash.deleteBoardWithPins(boardId)
      .then(() => {
        boardsData.getBoardsByUid(authData.getUid())
          .then((boards) => this.setState({ boards }));
      })
      .catch((err) => console.error('Getting the boards broke -> ', err));
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;

    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard}/>);

    return (
      <div className="BoardContainer card-columns p-5">
        {boardCard}
      </div>
    );
  }
}

export default BoardContainer;
