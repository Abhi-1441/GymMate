import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    height: 0,
    weight: 0,
    requiredProtein: 0,
    requiredCalories: 0
}

const bodyFeaturesSlice = createSlice({
    name: 'bodyFeatures',
    initialState,
    reducers: {
        addBodyFeatures: (state, action) => {
            const { height, weight } = action.payload;
            state.height = height;
            state.weight = weight;
            state.requiredProtein = 0.8 * weight;

        },
    },
});

export const { addBodyFeatures } = bodyFeaturesSlice.actions;
export default bodyFeaturesSlice.reducer;