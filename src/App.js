import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

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
  useEffect(() => {
    // Send http request
    // cart.json() node
    // Send a PUT request overriding existing data with the incoming data

    // Dispatch action with extra payload in the form of object
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending',
        message: 'Sending cart data...',
      })
    );

    const sendCartData = async () => {
      // Set notification from the start when we start sending data
      // We could use useState i.e showError and conditionally rendered the notification component with the appropriate content. But we can implement with Redux because we already have a UI slice in Redux
      // MANAGE THE NOTIFICATION STATE WITH REDUX

      const response = await fetch(
        'https://react-http-858b3-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      // If response is not ok
      if (!response.ok) {
        // Throw a new error
        throw new Error('Sending cart data failded.');

        // Dispatch an action once we done
        // dispatch(
        //   uiActions.showNotification({
        //     status: 'error',
        //     title: 'Error!',
        //     message: 'Sending cart data failed!',
        //   })
        // );
      }

      const responseData = await response.json();
      // If successful
      // Show success notification

      // Dispatch an action once we done
      // Dispatch action with extra payload in the form of object
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    // If isInitial true then not call function so not send cart data
    if (isInitial) {
      isInitial = false;

      return;
    }

    sendCartData().catch(error => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );

      // USE THE SHOWNOTIFICATION STATE
      console.log(error);
    });
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
