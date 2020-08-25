import React from 'react';
import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  state = {
    name: '',
    description: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const { name, description } = this.state;

    const newBoard = {
      name,
      description,
      uid: authData.getUid(),
    };

    console.warn('Here\'s a new baord ->', newBoard);
  }

  render() {
    return (
      <form className="col-6 offset-3">
        <div className="form-group mt-3">
          <label htmlFor="boardName">Board Name</label>
          <input
            type="text"
            className="form-control"
            id="boardName"
            placeholder="Enter Board Name"
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
            onChange={this.changeDescriptionEvent}
            />
        </div>
        <button className="btn btn-dark" onClick={this.saveBoardEvent}>Save Board</button>
      </form>
    );
  }
}

export default BoardForm;
