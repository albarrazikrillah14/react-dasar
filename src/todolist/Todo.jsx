import PropTypes from "prop-types";

export default function Todo({text = "title", isCompleted = false, isDeleted = false}) {
  if (isDeleted) {
    return null
  }

  return (
      <li>
        {text} {isCompleted && 'OK'}
      </li>
  );
}

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  isDeleted: PropTypes.bool
}