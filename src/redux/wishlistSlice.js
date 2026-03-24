import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    setWishlist: (state, action) => {
      state.wishlistItems = action.payload;
    },
    addToWishlist: (state, action) => {
      if (!state.wishlistItems.find((i) => i._id === action.payload._id)) {
        state.wishlistItems.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id?.toString() !== action.payload?.toString()
      );
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
