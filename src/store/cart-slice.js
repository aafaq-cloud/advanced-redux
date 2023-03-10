import { createSlice } from '@reduxjs/toolkit';

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
    replaceCart(state, action) {
      // Replace our frontend cart with firebase data
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
