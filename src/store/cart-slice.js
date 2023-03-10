import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

/*
items: [
  {
    itemId: newItem.id,
    price: newItem.price,
    quantity: 1,
    //   The quantity is one
    totalPrice: newItem.price,
    name: newItem.title,
  },
];
*/
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    // totalPrice: 0,
  },
  reducers: {
    // Different functions
    // Action to add item in cart
    /**
     * So here we get a state and we'll also accept this action argument because this action, when it is dispatched, should carry extra information. We need to know which item should be added after all.
     */
    addItemToCart(state, action) {
      // Update the total quantity of cart in state no matter if have an existing item or not
      // So that we udate badge
      state.totalQuantity++;

      // Extract item
      // What should happen in there? Well, in there, we should probably extract the item from the action and there keep in mind that it will be the payload property which Redux Toolkit sets for you which contains any extra data you add it to the action. And here, I assume that this extra data is another object describing the item that should be added.
      //   If it's part of an array already just increase the quantity of the existing cart item instead of pushing to the cart item
      const newItem = action.payload;
      console.log('State items in add to cart:');
      console.log(state.items);

      /**
           * itemId: id,
        name: title,
        price: price,
           */
      //   Dig into state
      //   const existingItem = state.items.find(item => item.id === newItem.id);
      //   const existingItem = state.items.find(
      //     item => item.itemId == newItem.itemId
      //   );
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        // Push to an array
        // Note: And that would be absolutely bad if you're using just Redux because push manipulates the existing array in the existing state and that's a must not do, but with Redux Toolkit, as emphasized before, we don't have that problem becaue there Redux Tookit internally ensures that this will not manipulate the existing state but that it instead transforms this into an operation which updates the state in an immutable way.
        // Mutate original array
        // state.items.push(newItem);

        // Note: These field names are all upto you because it will be your data, which you manage. You just need to ensure that you then reference and create objects that have the correct structure.
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          //   The quantity is one
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        console.log('Run else part');
        // If item already exists
        //   Then reach out to the existing item and update those fields on the existing item.
        // existingItem.quantity = existingItem.quantity + 1;
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },

    // Action to remove item from cart
    removeItemFromCart(state, action) {
      // So that we udate badge
      state.totalQuantity--;

      // We expect that payload is an id of the item
      const id = action.payload;

      // Remove item from array based on id
      //   if (id) {
      //     //   Find item and remove it from an array
      //     // Now we don't need to check if it's the part of the array. We know that it will be part but we need to find out how many items are in the array.
      //     state.items.find(item => item.itemId === id);
      //   }

      //   Find item and remove it from an array
      // Now we don't need to check if it's the part of the array. We know that it will be part but we need to find out how many items are in the array.
      console.log('State items:');
      console.log(state.items);
      const existingItem = state.items.find(item => item.id === id);

      console.log('Existing item:');
      console.log(existingItem);

      // Check if it has only one quantity
      if (existingItem.quantity === 1) {
        // Remove item from array
        //   Mutate original array
        //   Override state items array with a new array
        //   Keep items and filtered out item where id matches
        state.items = state.items.filter(item => item.id !== id);
      } else {
        // If it greater than one reach out to the quantiy and decrease it by one
        existingItem.quantity--;

        //   Update information
        //   Total price etc
        //   Deducting the price of a single unit from the totla price since we're removing one unit
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

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
      const response = await fetch(
        'https://react-http-858b3-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
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

export const cartActions = cartSlice.actions;

export default cartSlice;
