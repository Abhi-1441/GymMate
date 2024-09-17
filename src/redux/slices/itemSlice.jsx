import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalProtein: 0,
    totalCalories: 0,
};

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            if (!newItem || typeof newItem.totalProtein !== 'number' || typeof newItem.totalCalories !== 'number') {
                console.error('Invalid payload:', newItem);
                return;
            }

            state.items.push(newItem);
            state.totalProtein += newItem.totalProtein;
            state.totalCalories += newItem.totalCalories;
        },
        updateItems: (state, action) => {
            state.items = action.payload;
            // Recalculate total protein and calories
            state.totalProtein = state.items.reduce((total, item) => total + item.totalProtein, 0);
            state.totalCalories = state.items.reduce((total, item) => total + item.totalCalories, 0);
        },
        clearItems: (state, action) => {
            state.items = [];
            state.totalCalories = 0;
            state.totalProtein = 0;
        }

    },
});

export const { addItem, updateItems, clearItems } = itemSlice.actions;
export default itemSlice.reducer;
