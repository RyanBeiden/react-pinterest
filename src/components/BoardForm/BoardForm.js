import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    createBoard: PropTypes.func.isRequired,
    boardThatIAmEditing: PropTypes.object.isRequired,
    updateBoard: PropTypes.func.isRequired,
  }

  state = {
    boardName: '',
    description: '',
    isEditing: false,
  }

  componentDidMount() {
    const { boardThatIAmEditing } = this.props;
    if (boardThatIAmEditing.boardName) {
      this.setState({
        boardName: boardThatIAmEditing.boardName,
        description: boardThatIAmEditing.description,
        isEditing: true,
      });
    }
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const { boardName, description } = this.state;
    const { createBoard } = this.props;

    const newBoard = {
      boardName,
      description,
      uid: authData.getUid(),
    };

    createBoard(newBoard);
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { boardName, description } = this.state;
    const { updateBoard, boardThatIAmEditing } = this.props;

    const myBoardWithChanges = {
      boardName,
      description,
      uid: authData.getUid(),
    };

    updateBoard(boardThatIAmEditing.id, myBoardWithChanges);
  }

  render() {
    const { boardName, description, isEditing } = this.state;

    return (
      <form className="col-6 offset-3">
        <div className="form-group mt-3">
          <label htmlFor="boardName">Board Name</label>
          <input
            type="text"
            className="form-control"
            id="boardName"
            placeholder="Enter Board Name"
            value={boardName}
            onChange={this.changeNameEvent}
            />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="boardDescription">Description</label>
          <input
            type="text"
            className="form-control"
            id="boardDescription"
            placeholder="Enter Board Description"
            value={description}
            onChange={this.changeDescriptionEvent}
            />
        </div>
        { isEditing
          ? <button className="btn btn-dark" onClick={this.editBoardEvent}>Update Board</button>
          : <button className="btn btn-dark" onClick={this.saveBoardEvent}>Save Board</button>
        }
      </form>
    );
  }
}

export default BoardForm;
