import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    image: '',
    name: '',
    surname: '',
    email: '',
    phone: ''
};

const freelancerResume = createSlice({
    name: 'freelancer-resume',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.image = action.payload.image;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        }
    }
});

export const { addData } = freelancerResume.actions;
export default freelancerResume.reducer;