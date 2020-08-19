import React from 'react';
import PropTypes from 'prop-types';

import boardsData from '../../helpers/data/boardsData';

class SingleBoard extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
  }

  state = {
    board: {},
  }

  componentDidMount() {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((response) => this.setState({ board: response.data }))
      .catch((err) => console.error('Getting the single board failed -> ', err));
  }

  render() {
    const { board } = this.state;
    const { setSingleBoard } = this.props;

    return (
      <div>
        <h4>{board.boardName}</h4>
        <button className="btn btn-warning" onClick={() => { setSingleBoard(''); }}>X</button>
      </div>
    );
  }
}

export default SingleBoard;
