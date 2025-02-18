import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    numberSelectedItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
     // state.items.push(action.payload);
      const {name, image, cost} = action.payload;
      const existingItem = state.items.find(item=> item.name === name);
      
      if(existingItem){
        existingItem.quantity++;
      }else{
        state.items.push({name, image, cost, quantity:1});
      }

      state.numberSelectedItems = state.numberSelectedItems + 1;
    },

    removeItem: (state, action) => {
      state.numberSelectedItems -= action.payload.quantity;
      state.items = state.items.filter(item => item.name !== action.payload.name);
      
    },

    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if(itemToUpdate){
        state.numberSelectedItems = state.numberSelectedItems - itemToUpdate.quantity + quantity;
        itemToUpdate.quantity = quantity;
        

      } 

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
