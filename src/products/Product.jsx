import PropTypes from "prop-types";

export default function Product({id, name, price}) {
  return (
    <div>
      <h1>{id} - {name}</h1>
      <p>Harga : {price}</p>
    </div>
  )
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}