import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "src/services/api";

const initialState = {
    freelancerSkills: [],
    freelancerHobbies: [],
    freelancerLanguages: [],
    freelancerInfo: {},
    countriesList: [],
    freelancerEducation: [],
    freelancerExperience: []
};

export const getFreelancerSkills = createAsyncThunk(
    'freelancer/getFreelancerSkills',
    async () => {
        const response = await API.getFreelancerSkills()
        return response.data;
    }
)
export const getFreelancerHobbies = createAsyncThunk(
    'freelancer/getFreelancerHobbies',
    async () => {
        const response = await API.getFreelancerHobbies()
        return response.data;
    }
)
export const getFreelancerLanguages = createAsyncThunk(
    'freelancer/getFreelancerLanguages',
    async () => {
        const response = await API.getFreelancerLanguages()
        return response.data;
    }
)
export const getCountiesList = createAsyncThunk(
    'freelancer/getCountiesList',
    async () => {
        const response = await API.getCountriesList()
        return response.data;
    }
)
export const getFreelancerEducations = createAsyncThunk(
    'freelancer/getFreelancerEducations',
    async () => {
        const response = await API.getFreelancerEducations()
        return response.data;
    }
)
export const getFreelancerExperiences = createAsyncThunk(
    'freelancer/getFreelancerExperiences',
    async () => {
        const response = await API.getFreelancerExperiences()
        return response.data;
    }
)

const freelancerBackData = createSlice({
    name: 'freelancer-resume',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFreelancerSkills.fulfilled, (state, action) => {
            state.freelancerSkills = action.payload;
        })
        builder.addCase(getFreelancerHobbies.fulfilled, (state, action) => {
            state.freelancerHobbies = action.payload;
        })
        builder.addCase(getFreelancerLanguages.fulfilled, (state, action) => {
            state.freelancerLanguages = action.payload;
        })
        builder.addCase(getCountiesList.fulfilled, (state, action) => {
            state.countriesList = action.payload
        })
        builder.addCase(getFreelancerEducations.fulfilled, (state, action) => {
            state.freelancerEducation = action.payload
        })
        builder.addCase(getFreelancerExperiences.fulfilled, (state, action) => {
            state.freelancerExperience = action.payload
        })
    },
});

export default freelancerBackData.reducer;