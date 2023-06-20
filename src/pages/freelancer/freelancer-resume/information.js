import Photo from "./components/photo/Photo.jsx";
import Yourself from "./components/yourself/Yourself.jsx";
import Language from "./components/language/Language.jsx";
import Country from "./components/country/Country.jsx";
import SocialMedia from "./components/social-media/SocialMedia.jsx";
import SelectResume from "./components/select-resume/SelectResume.jsx";
import Educations from "./components/Educations/Educations/Educations";
import WorkExperience from "./components/WorkExperience/WorkExperience/WorkExperience";

export let dot = [
    { id: 1, label: "Personal information" },
    { id: 2, label: "Address" },
    { id: 3, label: "About yourself and skills" },
    { id: 4, label: "Language" },
    { id: 5, label: "Experience" },
    { id: 6, label: "Educations" },
    { id: 7, label: "Contacts" },
    { id: 8, label: "Resume" },
]

export const cards = [
    { id: 1, label: <Photo />, type: "photo" },
    { id: 2, label: <Country />, type: "country" },
    { id: 3, label: <Yourself />, type: "yourself" },
    { id: 4, label: <Language />, type: "lenguage" },
    { id: 5, label: <WorkExperience />, type: "workexperience" },
    { id: 6, label: <Educations />, type: "education" },
    { id: 7, label: <SocialMedia />, type: "media" },
    { id: 8, label: <SelectResume />, type: "resume" }
];