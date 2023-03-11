import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

// Redux Thunk Middleware for fetchind cart data from backend
export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      // GET REQUEST
      const response = await fetch(
        'https://react-http-858b3-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      console.log('Cart data is fetched from backend:');
      console.log(cartData);
      // Use cart data to set cart
      // Format of firebase
      // Correct structure already
      // dispatch(cartActions.replaceCart(cartData));
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (err) {
      console.log(err);

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

// Action creator
// Note: Redux Tookit creates these action creators automatically for use
// Every method in the reducers object receives such an action creator which is called by using that reducer function name
// Regular Function
// Middle

// We're createing a function send cart data which will immediately without doing anything returns another function async function
export const sendCartData = cart => {
  // So we don't even write such action creators on our own
  // return {type: '', payload: ...}

  // Function return another function
  // It should receive dispatch function as an argument

  // NOTE: Redux Toolkit executes that returned function for you AND it will give us that dispatch argument automatically so that in that executed function we can dispatch action again and perform side effects and then can perform another actions which eventually
  return async dispatch => {
    // The actual action we wanna perform like for example showing a notification or adding a cart item but before we call dispatch we can do of course do other things for example we can perform asynchronous code, any side effects because we will not yet have reached our reducer. We're not running side effect code in a reducer. It's a separate standalone JavaScript function instead.
    // dispatch();

    // Dipatch actual actions that we wanna perform

    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending',
        message: 'Sending cart data...',
      })
    );

    const sendRequest = async () => {
      //   Perform asynchronous code
      // const response = await fetch(
      //   'https://react-http-858b3-default-rtdb.firebaseio.com/cart.json',
      //   {
      //     method: 'PUT',
      //     body: JSON.stringify(cart),
      //   }
      // );

      const response = await fetch(
        'https://react-http-858b3-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        // Throw a new error
        throw new Error('Sending cart data failded.');
      }

      const result = await response.json();
      console.log(result);
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};
