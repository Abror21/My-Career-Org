import Axios from 'axios';

export const BASE_URL = "http://mycareer-dev.csolutions.uz";

// export const CONTACT_US = `${BASE_URL}/api/contacts-us`;
// export const REGISTER_USER = `${BASE_URL}/api/auth/register`;
// export const CHECK_EMAIL = `${BASE_URL}/api/auth/CheckEmail?email`;
// export const LOGIN_USER = `${BASE_URL}/api/auth/login`;
// export const JOBS = `${BASE_URL}/api/job`;
// export const COUNTRIES_LIST = `${BASE_URL}/api/country`;
// export const LANGUAGES = `${BASE_URL}/api/language`;
// export const FREELANCER_SKILL = `${BASE_URL}/api/user-skill`;
// export const FREELANCER_SKILLS = `${BASE_URL}/api/skill?position=WebDesigner`;
// export const FREELANCER_HOBBY = `${BASE_URL}/api/user-hobby`;
// export const FREELANCER_LANGUAGE = `${BASE_URL}/api/user-language`;
// export const FREELANCER_EXPERIENCE = `${BASE_URL}/api/experience`;
// export const FREELANCER_EDUCATION = `${BASE_URL}/api/education`;
// export const FREELANCER = `${BASE_URL}/api/freelancer`;


export const axiosInstance = Axios.create({
    baseURL: BASE_URL,
});

// run before each request
axiosInstance.interceptors.request.use(
    async config => {
        if (!config.headers.Authorization) {
            const token = localStorage.getItem('user-token');
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }
        }
        return config;
    },
    error => Promise.reject(error),
);

export const API = {
    // language
    getFreelancerLanguages: () => axiosInstance.get('/api/user-language'),
    postFreelancerLanguages: (payload) => axiosInstance.post('/api/user-language', payload),
    putFreelancerLanguage: (payload) => axiosInstance.put('/api/user-language', payload),
    deleteFreelancerLanguage: (id) => axiosInstance.delete(`/api/user-language/${id}`),

    // freelancer
    postFreelancer: (payload) => axiosInstance.post('/api/freelancer', payload),
    getFreelancer: () => axiosInstance.get('/api/freelancer'),

    // skill
    getFreelancerSkills: () => axiosInstance.get('/api/user-skill'),
    postFreelancerSkills: (payload) => axiosInstance.post('/api/user-skill', payload),
    deleteFreelancerSkill: (payload) => axiosInstance.delete(`/api/user-skill/${payload}`),
    getSkillsList: () => axiosInstance.get('api/skill?position=WebDesigner'),

    // hobbies
    getFreelancerHobbies: () => axiosInstance.get('/api/user-hobby'),
    postFreelancerHobbie: (payload) => axiosInstance.post('/api/user-hobby', payload),
    deleteFreelancerHobbie: (payload) => axiosInstance.delete(`/api/user-hobby/${payload}`),

    // countries
    getCountriesList: () => axiosInstance.get('/api/country'),

    // regions
    getRegonsList: (id) => axiosInstance.get(`/api/country/${id}`),

    // educations
    getFreelancerEducations: () => axiosInstance.get('/api/education'),
    putFreelancerEducation: (id, payload) => axiosInstance.put(`/api/education/${id}`, payload),
    postFreelancerEducation: (payload) => axiosInstance.post('/api/education/', payload),
    deleteFreelancerEducation: (id) => axiosInstance.delete(`/api/education/${id}`),

    // experience
    getFreelancerExperiences: () => axiosInstance.get('/api/experience'),
    putFreelancerExperience: (id, payload) => axiosInstance.put(`/api/experience/${id}`, payload),
    postFreelancerExperience: (payload) => axiosInstance.post('/api/experience/', payload),
    deleteFreelancerExperience: (id) => axiosInstance.delete(`/api/experience/${id}`),

    // auth
    registerUser: (payload) => axiosInstance.post('/api/auth/register', payload),
    loginUser: (payload) => axiosInstance.post('/api/auth/login', payload),

    // contact us
    postContactUs: (payload) => axiosInstance.post('/api/contacts-us', payload),
}