import PropTypes from "prop-types";

let counter = 0;

export default function Row({text}) {
  counter++;
  return (
    <tr>
      <td>{counter}</td>
      <td>{text}</td>
  </tr>
  );
}

Row.propTypes = {
  text: PropTypes.string.isRequired
}