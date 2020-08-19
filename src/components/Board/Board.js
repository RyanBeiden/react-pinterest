import React from 'react';

import boardShape from '../../helpers/props/boardShape';
import '../Board/Board.scss';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
  }

  render() {
    const { board } = this.props;

    return (
      <div className="card text-center">
        <div className="card-header">{board.boardName}</div>
        <div className="card-body">
          <h6 className="card-title">{board.description}</h6>
          <button className="btn btn-danger">View Board Details</button>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    );
  }
}

export default Board;
