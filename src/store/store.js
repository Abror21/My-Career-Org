import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import login from "./loginSlice/LoginSlice";
import resume from "./resumeSlice/ResumeSlice";
import freelance from "./freelancerSlice/FreelancerSlice";
import language from "./languageSlice/LanguageSlice"
import contract from "./contractSlice/contractSlice"
import resumeControle from "./resumeControlsSlice/resumeControls"
import companyRegister from "../store/companyRegister/companyRegister";
import jobs from "./jobsSlice/JobsSlice";
import project from "./resumeSlice/projectSlice";
import frilancerCards from "./frilanserCardSlice/frilanserCardSlice";
import freelancerResume from "./freelancer-resume/freelancerResume";

const rootReducer = combineReducers({
    freelancerResume,

    login,
    resume,
    freelance,
    language,
    contract,
    resumeControle,
    companyRegister,
    jobs,
    project,
    frilancerCards
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['freelancerResume'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);
export default store;