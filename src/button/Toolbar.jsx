import PropTypes from "prop-types";

export default function Toolbar({onClick}) {
  return (
    <div onClick={onClick} style={{
      backgroundColor: "yellowgreen"
    }}>
      <button onClick={onClick}>First</button>
      <button onClick={onClick}>Second</button>
    </div>
    
  );
}

Toolbar.propTypes = {
  onClick: PropTypes.func.isRequired
}