import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';

import classes from './CartItem.module.css';

const CartItem = props => {
  const dispatch = useDispatch();

  // Pull out key value pairs from object
  const { title, quantity, total, price, id } = props.item;

  const removeItemHandler = () => {
    console.log('Remove item handler');
    // Dispatch action
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    // Add http request to send data to firebase

    console.log('Add item handler');
    /**
     *
    itemId: newItem.id,
    price: newItem.price,
    quantity: 1,
    //   The quantity is one
    totalPrice: newItem.price,
    name: newItem.title,
  }
     */

    console.log(props.item);
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
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
