import PropTypes from "prop-types";

export default function Container({children}) {
  return (
    <div>
      <h1>Medomeckz</h1>
      {children}
      <footer>
        <p>2025 Albarra Zikrillah</p>
      </footer>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.element.isRequired
}