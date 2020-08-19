import React from 'react';

import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import Board from '../Board/Board';
import './BoardContainer.scss';

class BoardContainer extends React.Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('Getting the boards broke -> ', err));
  }

  render() {
    const { boards } = this.state;

    const boardCard = boards.map((board) => <Board key={board.id} board={board}/>);

    return (
      <div className="BoardContainer card-columns p-5">
        {boardCard}
      </div>
    );
  }
}

export default BoardContainer;
