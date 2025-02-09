import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "Sid",
    lastname: "M",
    userId: 1
};

export const User = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateFirstName: (state, action) => {
            state.firstName = action.payload.firstName;
        },
    },
});

export const {updateFirstName} = User.actions;
export default User.reducer;