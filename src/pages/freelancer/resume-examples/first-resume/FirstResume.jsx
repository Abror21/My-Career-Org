import ResumeTemplate from "../../resume-template/ResumeTemplate"
import classes from './FirstResume.module.css';
import freelancer from 'src/assets/images/Freelancer/defaultUserImage.png'
import phone from 'src/assets/images/Freelancer/phone-img.png'
import email from 'src/assets/images/Freelancer/pochta-img.png'
import location from 'src/assets/images/Freelancer/geo-img.png'
import website from 'src/assets/images/Freelancer/website-icon.png'
import watsapp from 'src/assets/images/Freelancer/whatsapp-icon.png'
import facebook from 'src/assets/images/Freelancer/facebook-icon.png'
import instagram from 'src/assets/images/Freelancer/instagram-icon.png'
import telegram from 'src/assets/images/Freelancer/telegram-icon.png'
import github from 'src/assets/images/Freelancer/github-icon.png'
import twitter from 'src/assets/images/Freelancer/twitter-icon.png'

const levelList = [
    { levelId: 0, value: "A1 - Beginner", label: "A1 - Beginner" },
    { levelId: 1, value: "A2 - Elementary", label: "A2 - Elementary" },
    { levelId: 2, value: "B1 - Intermediate", label: "B1 - Intermediate" },
    { levelId: 3, value: "B2 - Upper-Intermediate", label: "B2 - Upper-Intermediate" }
];
const option = [
    { value: "Primary", label: "Primary", id: 0 },
    { value: "Lower", label: "Lower", id: 1 },
    { value: "Upper", label: "Upper", id: 2 },
    { value: "Bachelor", label: "Bachelor", id: 3 },
    { value: "Master", label: "Master", id: 4 },
    { value: "Doctorate", label: "Doctorate", id: 5 },
];

const icons = [website, watsapp, facebook, instagram, telegram, github, twitter];

const FirstResume = ({ data, country, region, skills, languages, hobbies, education, experience }) => {
    const position = data.position === 0 ? 'Web Designer' : data?.position === 1 ? "Backend" : data?.position === 2 ? 'Frontend' : null;
    const socials = Object.keys(data?.contact).map((item, index) => {
        if (data?.contact[item].length > 0) {
            return <li className={classes['default-text']}><img src={icons[index]} alt="" />{data?.contact[item]}</li>
        }
    })
        .filter(item => item)
    const freelancerEducations = education.map(edu => {
        const isUntill = edu.dateTo == null ? "Present" : new Date(edu.dateTo).getFullYear()
        return (
            <div className={classes.education__content}>
                <div className={classes.education__period}>
                    <span>{new Date(edu.dateFrom).getFullYear()} - {isUntill}</span><br />
                    {edu.name}
                </div>
                <div className={classes.education__name}>
                    <span>{option[edu.degree].value}</span>
                    <p className={classes['default-text']}>
                        {edu.location}
                    </p>
                </div>
            </div>
        )
    })
    const freelancerExperiences = experience.map(exp => {
        const isUntill = exp.dateTo == null ? "Present" : new Date(exp.dateTo).getFullYear()
        return (
            <div className={classes.education__content}>
                <div className={classes.education__period}>
                    <span>{new Date(exp.dateFrom).getFullYear()} - {isUntill}</span><br />
                    {exp.companyName}
                </div>
                <div className={classes.education__name}>
                    <span>{exp.job}</span>
                    <p className={classes['default-text']}>
                        {exp.description}
                    </p>
                </div>
            </div>
        )
    })

    return (
        <ResumeTemplate>
            <div className={classes['white-resume']}>
                <div className={classes.header}>
                    <div className={classes.header__inner}>
                        <div className={classes.header__img}>
                            <img src={undefined} alt="" />
                        </div>
                        <div className={classes.header__info}>
                            <h2 className={classes.header__name}>{data?.name} {data?.surname}</h2>
                            <h6 className={classes.header__job}>{position}</h6>
                            <ul className={classes.header__list}>
                                <li><img src={phone} alt="" />{data?.phone}</li>
                                <li><img src={email} alt="" />{data?.email}</li>
                                <li><img src={location} alt="" />{country} {region} {data.street}</li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.header__line} />
                </div>

                <div className={classes.body}>
                    <div className={classes.body__left}>
                        {
                            skills &&
                            <div className={classes.skills}>
                                <h3 className={classes["default-title"]}>Skills</h3>
                                <ul className={classes.skills__list}>
                                    {
                                        skills?.map(skill => <li className={classes['default-text']}>{skill.skill.content}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            languages.length > 0 &&
                            <div className={classes.languages}>
                                <h3 className={classes["default-title"]}>Languages</h3>
                                <ul className={classes.languages__list}>
                                    {
                                        languages?.map(lang => <li className={classes['default-text']}>{lang.language.name} - {levelList[lang.level].value}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            hobbies.length > 0 &&
                            <div className={classes.hobbies}>
                                <h3 className={classes["default-title"]}>Hobbies</h3>
                                <ul className={classes.hobbies__list}>
                                    {
                                        hobbies?.map(hobby => <li className={classes['default-text']}>{hobby.hobby.content}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            socials.length > 0 &&
                            <div className={classes.contacts}>
                                <h3 className={classes["default-title"]}>Contacts</h3>
                                <ul className={classes.contacts__list}>
                                    {socials}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className={classes.body__right}>
                        <div className={classes.about}>
                            <h3 className={classes['default-title']}>About me</h3>
                            <p className={classes['default-text']}>{data.description}</p>
                        </div>
                        {
                            freelancerEducations.length > 0 &&
                            <div className={classes.education}>
                                <h3 className={classes['default-title']}>Education</h3>
                                {freelancerEducations}
                            </div>
                        }
                        {
                            freelancerExperiences.length > 0 &&
                            <div className={classes.education}>
                                <h3 className={classes['default-title']}>Experience</h3>
                                {freelancerExperiences}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </ResumeTemplate>
    )

}

export default FirstResume