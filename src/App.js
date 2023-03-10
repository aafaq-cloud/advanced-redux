import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  // Use key to drill into reducer
  const showCart = useSelector(state => state.ui.cartIsVisible);

  // Get cart data from Redux
  const cart = useSelector(state => state.cart);
  console.log('Cart:');
  console.log(cart);

  // Whenever cart state changes then send request to sync data
  // You can use it in any component
  // [cart] dependency i.e cart changes
  // The great thing is that useSelector() sets up a subscription to Redux so whenever our Redux store does change this component function will be re-evaluated and will get the latest state so in this case the latest cart.
  // Keep our logic in reducer i.e fat reducer
  // SO THAT IS VERY VERY NICE AND THAT'S A VERY GOOD WAY OF HAVING OUR SIDE EFFECT LOGIG IN A COMPONENT AND KEEPING ALL OUR DATA TRANSFORMATION LOGIC INSIDE OF A REDUCER
  useEffect(() => {
    // Send http request
    // cart.json() node
    // Send a PUT request overriding existing data with the incoming data
    fetch('https://react-http-858b3-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {/* Render conditionally based on disptach  */}
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
