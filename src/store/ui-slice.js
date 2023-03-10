import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
// Not: Initially we have no notification
const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    // Add reducer function for notification
    //   DISPATCH IT IN THE SIDE EFFECT
    showNotification(state, action) {
      // We expect some action payload in the form object notification
      //   STATUS MAYBE PENDING, SUCCESS, ERROR
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
