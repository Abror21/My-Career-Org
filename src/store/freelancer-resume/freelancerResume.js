import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    image: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    country: '',
    region: '',
    street: ''
};

const freelancerResume = createSlice({
    name: 'freelancer-resume',
    initialState,
    reducers: {
        addFreelancerInfo: (state, action) => {
            state.image = action.payload.image;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        addFreelancerAddress: (state, action) => {
            state.country = action.payload.country;
            state.region = action.payload.region;
            state.street = action.payload.street;
        }
    }
});

export const { addFreelancerInfo, addFreelancerAddress } = freelancerResume.actions;
export default freelancerResume.reducer;