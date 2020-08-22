import boardsData from './boardsData';
import pinsData from './pinsData';

const deleteBoardWithPins = (boardId) => new Promise((resolve, reject) => {
  pinsData.getPinsByBoardId(boardId)
    .then((boardPins) => {
      boardPins.forEach((pin) => {
        pinsData.deletePin(pin.id);
      });
      boardsData.deleteBoard(boardId)
        .then(() => {
          resolve();
        });
    })
    .catch((err) => reject(err));
});

export default { deleteBoardWithPins };
