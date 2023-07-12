import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    image: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    country: '',
    region: '',
    street: '',
    position: '',
    birthDate: '',
    // skills: [],
    // hobbies: [],
    description: '',
    // languages: [],
    // experience: [],
    education: [],
    contact: {}
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
        },
        addAboutFreelancer: (state, action) => {
            state.position = action.payload.position;
            state.birthDate = action.payload.birthDate;
            // state.skills = action.payload.skills;
            // state.hobbies = action.payload.hobbies;
            state.description = action.payload.description;
        },
        // addFreelancerLanguages: (state, action) => {
        //     state.languages = action.payload;
        // },
        // addFreelancerExperience: (state, action) => {
        //     const idx = state.experience.findIndex(exp => exp.id === action.payload.id);
        //     if (idx >= 0) {
        //         let currentEl = state.experience[idx];
        //         currentEl = { ...action.payload }
        //         state.experience[idx] = currentEl;
        //         state.experience = [...state.experience];
        //     } else {
        //         state.experience = [...state.experience, action.payload];
        //     }
        // },
        // removeFreelancerExperience: (state, action) => {
        //     state.experience = state.experience.filter(exp => exp.id !== action.payload);
        // },
        addFreelancerEducation: (state, action) => {
            const idx = state.education.findIndex(edu => edu.id === action.payload.id);
            if (idx >= 0) {
                let currentEl = state.education[idx];
                currentEl = { ...action.payload }
                state.education[idx] = currentEl;
                state.education = [...state.education];
            } else {
                state.education = [...state.education, action.payload];
            }
        },
        removeFreelancerEducation: (state, action) => {
            state.education = state.education.filter(edu => edu.id !== action.payload)
        },
        addContact: (state, action) => {
            state.contact = action.payload;
        }
    },
});

export const {
    addFreelancerInfo,
    addFreelancerAddress,
    addAboutFreelancer,
    // addFreelancerLanguages,
    // addFreelancerExperience,
    // removeFreelancerExperience,
    addFreelancerEducation,
    removeFreelancerEducation,
    addContact
} = freelancerResume.actions;

export default freelancerResume.reducer;