import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import Board from '../Board/Board';
import './BoardContainer.scss';
import smash from '../../helpers/data/smash';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

  componentDidMount() {
    boardsData.getBoardsByUid(authData.getUid())
      .then((resp) => this.setState({ boards: resp }))
      .catch((err) => console.error('Getting the boards broke -> ', err));
  }

  deleteBoard = (boardId) => {
    smash.deleteBoardWithPins(boardId)
      .then((resp) => {
        console.error(resp);
        boardsData.getBoardsByUid(authData.getUid())
          .then((response) => this.setState({ boards: response.data }));
      });
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
