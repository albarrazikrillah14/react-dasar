import PropTypes from 'prop-types';
import "./HelloWorld.css";

export default function HelloWorld({ text = "Ups, lupa kasih teks" }) {
  return (
    <div>
      <h1 className='title'>
        {text.toUpperCase()}
      </h1>
      <p className='content'>Selamat Belajar ReactJS</p>
    </div>
  );
}

HelloWorld.propTypes = {
  text: PropTypes.string.isRequired,
};
