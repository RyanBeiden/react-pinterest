import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const getSingleBoard = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const createBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

export default {
  getBoardsByUid,
  getSingleBoard,
  deleteBoard,
  createBoard,
};
