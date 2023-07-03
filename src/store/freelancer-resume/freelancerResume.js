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
    skills: [],
    hobbies: [],
    describeYourself: '',
    languages: [],
    freelancerExperience: [],
    freelancerEducation: [],
    freelancerContact: {}
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
            state.skills = action.payload.skills;
            state.hobbies = action.payload.hobbies;
            state.describeYourself = action.payload.description;
        },
        addFreelancerLanguages: (state, action) => {
            state.languages = action.payload;
        },
        addFreelancerExperience: (state, action) => {
            const idx = state.freelancerExperience.findIndex(exp => exp.id === action.payload.id);
            if (idx >= 0) {
                let currentEl = state.freelancerExperience[idx];
                currentEl = { ...action.payload }
                state.freelancerExperience[idx] = currentEl;
                state.freelancerExperience = [...state.freelancerExperience];
            } else {
                state.freelancerExperience = [...state.freelancerExperience, action.payload];
            }
        },
        removeFreelancerExperience: (state, action) => {
            state.freelancerExperience = state.freelancerExperience.filter(exp => exp.id !== action.payload)
        },
        addFreelancerEducation: (state, action) => {
            const idx = state.freelancerEducation.findIndex(edu => edu.id === action.payload.id);
            if (idx >= 0) {
                let currentEl = state.freelancerEducation[idx];
                currentEl = { ...action.payload }
                state.freelancerEducation[idx] = currentEl;
                state.freelancerEducation = [...state.freelancerEducation];
            } else {
                state.freelancerEducation = [...state.freelancerEducation, action.payload];
            }
        },
        removeFreelancerEducation: (state, action) => {
            state.freelancerEducation = state.freelancerEducation.filter(edu => edu.id !== action.payload)
        },
        addFreelancerContact: (state, action) => {
            state.freelancerContact = action.payload;
        }

    }
});

export const {
    addFreelancerInfo,
    addFreelancerAddress,
    addAboutFreelancer,
    addFreelancerLanguages,
    addFreelancerExperience,
    removeFreelancerExperience,
    addFreelancerEducation,
    removeFreelancerEducation,
    addFreelancerContact
} = freelancerResume.actions;

export default freelancerResume.reducer;