import { useDispatch } from 'react-redux';

// Import actions from cart slice
import { cartActions } from './../../store/cart-slice';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';
const ProductItem = props => {
  const dispatch = useDispatch();

  const { id, title, price, description } = props;

  console.log('Props:');
  console.log(props);

  // Add to cart handler where we dispatch appropriate action
  const addToCartHandler = () => {
    // Pass extra payload
    /**
     * {
    itemId: newItem.id,
    price: newItem.price,
    quantity: 1,
    //   The quantity is one
    totalPrice: newItem.price,
    name: newItem.title,
  },
     */
    // {// id: id,
    // // title: title,
    // // price: price,}
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          {/* Wire this button to the addItemToCart Function in our cart slice */}
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
