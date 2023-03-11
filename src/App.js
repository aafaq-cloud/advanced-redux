import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { uiActions } from './store/ui-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
// import { sendCartData } from './store/cart-slice';
import { fetchCartData, sendCartData } from './store/cart-actions';

// Middleware
// Redux Thunk

// Does not change whenever the component renders again
let isInitial = true;

function App() {
  // Use key to drill into reducer
  const showCart = useSelector(state => state.ui.cartIsVisible);

  // Get cart data from Redux
  // Cart state
  const cart = useSelector(state => state.cart);
  console.log('Cart:');
  console.log(cart);

  // Get access to dispatch function by executing useDispatch() hook
  const dispatch = useDispatch();

  // Get data from Redux
  const notifcation = useSelector(state => state.ui.notification);

  console.log('Notification state:');
  console.log(notifcation);
  // Note: It's either null or it's an object as set by us as this dispatched by us

  // Whenever cart state changes then send request to sync data
  // You can use it in any component
  // [cart] dependency i.e cart changes
  // The great thing is that useSelector() sets up a subscription to Redux so whenever our Redux store does change this component function will be re-evaluated and will get the latest state so in this case the latest cart.
  // Keep our logic in reducer i.e fat reducer
  // SO THAT IS VERY VERY NICE AND THAT'S A VERY GOOD WAY OF HAVING OUR SIDE EFFECT LOGIG IN A COMPONENT AND KEEPING ALL OUR DATA TRANSFORMATION LOGIC INSIDE OF A REDUCER
  // PROBLEM WITH USEEFFECT

  // PROBLEM: WHEN WE RELOAD PAGE THEN FETCH DATA FROM BACKEND BUT THE SAME TIME SENDING AGAIN
  // The problem is when we fetching the data once fetching is done, we replace the cart right with that fetched that changes the cart inside of Redux. Now since that cart then changed we trigger this other effect and send the cart data
  // REASON: When app loads first time the cart data is fetched and it's state changed i.e [cart]

  // When component renders for the first time
  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    // USE sendCartData() as an action creator
    if (isInitial) {
      isInitial = false;
      return;
    }

    // When application loads start fetching data

    // Dispatch an action
    // Dispatch function that returns another function
    dispatch(sendCartData(cart));
    // cart change
  }, [cart]);

  return (
    <Fragment>
      {/* Conditionally render notification and pass data to component via prop because we dispatch different actions */}
      {notifcation && (
        <Notification
          status={notifcation.status}
          title={notifcation.title}
          message={notifcation.message}
        />
      )}
      <Layout>
        {/* Render conditionally based on disptach  */}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
