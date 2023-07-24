import { useEffect, useState } from "react";
import classes from "./resume-finish.module.scss";
import "./ComplateResume.scss";
import arrowLeft from "src/assets/images/arrow-left.svg";
import logo from "src/assets/images/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import Round from "src/components/Round/Round";
import FirstResume from "src/pages/freelancer/resume-examples/first-resume/FirstResume";
import SecondResume from "src/pages/freelancer/resume-examples/second-resume/SecondResume";
import ThirdResume from "src/pages/freelancer/resume-examples/third-resume/ThirdResume";
import FourthResume from "src/pages/freelancer/resume-examples/fourth-resume/FourthResume";
import { API } from "src/services/api";
import { toast } from "react-toastify";
import { getCountiesList, getFreelancerEducations, getFreelancerExperiences, getFreelancerHobbies, getFreelancerLanguages, getFreelancerSkills } from "src/store/freelancer-back-data/freelancerBackData";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "src/components/error-handler/ErrorHandler";

const levelList = [
    { levelId: 0, value: "A1 - Beginner", label: "A1 - Beginner" },
    { levelId: 1, value: "A2 - Elementary", label: "A2 - Elementary" },
    { levelId: 2, value: "B1 - Intermediate", label: "B1 - Intermediate" },
    { levelId: 3, value: "B2 - Upper-Intermediate", label: "B2 - Upper-Intermediate" }
];
const degreeList = [
    { value: "Primary", label: "Primary", id: 0 },
    { value: "Lower", label: "Lower", id: 1 },
    { value: "Upper", label: "Upper", id: 2 },
    { value: "Bachelor", label: "Bachelor", id: 3 },
    { value: "Master", label: "Master", id: 4 },
    { value: "Doctorate", label: "Doctorate", id: 5 },
];

const FreelancerResumeFinish = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { resumeId } = useParams();

    const [region, setRegion] = useState(null);

    const { freelancerSkills, freelancerHobbies, freelancerLanguages, countriesList, freelancerEducation, freelancerExperience } = useSelector(state => state.freelancerBackData);
    const freelancerResume = useSelector(state => state.freelancerResume);

    const handleClick = () => {
        navigate(-1);
        dispatch(activeDoteAction([{ id: 1, label: "Personal information" }, { id: 1, label: "photo" }]));
    };

    const chooseActiveResume = (data, skills, languages, hobbies, education, experience) => {
        const country = countriesList[data.country - 1]?.name
        let activeResume;
        switch (resumeId) {
            case "1":
                activeResume = <FirstResume
                    levelList={levelList}
                    degreeList={degreeList}
                    data={data}
                    country={country}
                    region={region}
                    skills={skills}
                    languages={languages}
                    hobbies={hobbies}
                    education={education}
                    experience={experience}
                />
                break;
            case "2":
                activeResume = <SecondResume
                    levelList={levelList}
                    degreeList={degreeList}
                    data={data}
                    country={country}
                    region={region}
                    skills={skills}
                    languages={languages}
                    hobbies={hobbies}
                    education={education}
                    experience={experience}
                />
                break;
            case "3":
                activeResume = <ThirdResume
                    levelList={levelList}
                    degreeList={degreeList}
                    data={data}
                    country={country}
                    region={region}
                    skills={skills}
                    languages={languages}
                    hobbies={hobbies}
                    education={education}
                    experience={experience}
                />
                break;
            case "4":
                activeResume = <FourthResume
                    levelList={levelList}
                    degreeList={degreeList}
                    data={data}
                    country={country}
                    region={region}
                    skills={skills}
                    languages={languages}
                    hobbies={hobbies}
                    education={education}
                    experience={experience}
                />
                break;
            default:
                activeResume = <FirstResume
                    levelList={levelList}
                    degreeList={degreeList}
                    data={data}
                    country={country}
                    region={region}
                    skills={skills}
                    languages={languages}
                    hobbies={hobbies}
                    education={education}
                    experience={experience}
                />
        }
        return (
            <ErrorBoundary
                FallbackComponent={ErrorHandler}
            >
                {activeResume}
            </ErrorBoundary >
        );
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('FirstName', freelancerResume.name);
        formData.append('LastName', freelancerResume.surname);
        formData.append('PhoneNumber', freelancerResume.phone.replace(/[^0-9\+]/g, ""));
        formData.append('Email', freelancerResume.email);
        formData.append('Address.CountryId', freelancerResume.country);
        formData.append('Address.RegionId', freelancerResume.region);
        formData.append('Address.Street', freelancerResume.street);
        formData.append('Position', freelancerResume.position);
        formData.append('DateOfBirthString', freelancerResume.birthDate);
        formData.append('Bio', freelancerResume.description);
        formData.append('Contact.WhatsApp', freelancerResume.contact.WatsApp);
        formData.append('Contact.Facebook', freelancerResume.contact.Facebook);
        formData.append('Contact.Twitter', freelancerResume.contact.Twitter);
        formData.append('Contact.Instagram', freelancerResume.contact.Instagram);
        formData.append('Contact.Telegram', freelancerResume.contact.Telegram);
        formData.append('Contact.Github', freelancerResume.contact.GitHub);
        formData.append('Contact.WebSite', freelancerResume.contact.website);
        formData.append('FormFile', null);

        API.postFreelancer(formData)
            .then(res => {
                if (res.status === 200) {
                    toast.success("Successfully submitted", { position: toast.POSITION.TOP_LEFT })

                }
            })
            .catch(err => {
                if (err.response.data.message && err.response.data.message == "This user already registered as Freelancer") {
                    toast.warning(err.response.data.message);
                    return
                }
                toast.error(err.message)
            })
    };

    useEffect(() => {
        API.getRegonsList(freelancerResume.country)
            .then(res => setRegion(res.data.regions[freelancerResume.region - 1].name))
        dispatch(getFreelancerSkills())
        dispatch(getFreelancerHobbies())
        dispatch(getFreelancerLanguages())
        dispatch(getCountiesList())
        dispatch(getFreelancerEducations())
        dispatch(getFreelancerExperiences())
    }, [])

    return (

        <div className={classes.resume__finish}>
            <div className={classes.resume__finish_container}>
                <div className={classes.resume__finish_inner}>
                    <div className={classes.resume__finish_header}>
                        <div className={classes.resume__finish_logo}>
                            <a className={classes.logo} href="/">
                                <img src={logo} alt="NAPA automotive" />
                            </a>
                        </div>
                        <button className={classes.resume__finish_back} onClick={handleClick}>
                            <img src={arrowLeft} alt="Arrov left" />
                            <span>Back</span>
                        </button>
                    </div>
                    <div className={classes.resume__finish_main}>
                        <h3 className={classes.resume__finish_title}>Your Resume is Done!</h3>
                        <div className={classes.resume__finish_box}>
                            {(!freelancerResume) && <h1 style={{ color: 'tomato' }}>Data not found</h1>}
                            {freelancerResume && chooseActiveResume(
                                freelancerResume, freelancerSkills, freelancerLanguages, freelancerHobbies, freelancerEducation, freelancerExperience
                            )}
                            <div className={classes.finish__box}>
                                <button className={classes.finish} onClick={handleSubmit}>
                                    Finish
                                </button>
                            </div>
                        </div>
                    </div>
                    <Round position={{ top: '25%', right: '-14%', left: 'unset' }} zIndex={0} />
                </div>
            </div>
        </div>
    );
};

export default FreelancerResumeFinish;
