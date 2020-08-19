import PropTypes from 'prop-types';

const pinShape = PropTypes.shape({
  boardId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  pinName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { pinShape };
