import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
  // Use data from redux to update cart items
  const cartItems = useSelector(state => state.cart.items);
  console.log('Cart items:');
  console.log(cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {/* <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        /> */}
        {/* Note: The CartItem Componnet expects an object of the shape { title: 'Test Item', quantity: 3, total: 18, price: 6 } */}
        {/* Structure of items in store */}
        {/* {
    itemId: newItem.id,
    price: newItem.price,
    quantity: 1,
    //   The quantity is one
    totalPrice: newItem.price,
    name: newItem.title,
  } */}
        {/* Note: The item is the data coming from Redux */}
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
