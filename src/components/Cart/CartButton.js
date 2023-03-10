import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = props => {
  // We need data from the cart ie. we need total quantity

  // The useSelector() hook to select the piece of data and component autaomatically subscribe to the store and when store state update store send notification to update state where the state is being used

  // Select data slice and use it in component
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      {/* <span className={classes.badge}>1</span> */}
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );

  // Render cart directly
};

export default CartButton;
