import { configureStore } from "@reduxjs/toolkit";
import login from "./loginSlice/LoginSlice";
import resume from "./resumeSlice/ResumeSlice";
import freelance from "./freelancerSlice/FreelancerSlice";
import language from "./languageSlice/LanguageSlice"
import contract from "./contractSlice/contractSlice"
import resumeControle from "./resumeControlsSlice/resumeControls"
import companyRegister from "./companyRegister/companyRegister";
import jobs from "./jobsSlice/JobsSlice";
import project from "./resumeSlice/projectSlice";
import frilancerCards from "./frilanserCardSlice/frilanserCardSlice";

const store = configureStore({
	reducer: {
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
	}
});

export default store;