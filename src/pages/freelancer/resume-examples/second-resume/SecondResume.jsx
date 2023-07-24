import ResumeTemplate from "../../resume-template/ResumeTemplate"
import classes from './SecondResume.module.css';
import website from 'src/assets/images/Freelancer/website-icon.png'
import watsapp from 'src/assets/images/Freelancer/whatsapp-icon.png'
import facebook from 'src/assets/images/Freelancer/facebook-icon.png'
import instagram from 'src/assets/images/Freelancer/instagram-icon.png'
import telegram from 'src/assets/images/Freelancer/telegram-icon.png'
import github from 'src/assets/images/Freelancer/github-icon.png'
import twitter from 'src/assets/images/Freelancer/twitter-icon.png'

const icons = [website, watsapp, facebook, instagram, telegram, github, twitter];

const SecondResume = ({ levelList, degreeList, data, country, region, skills, languages, hobbies, education, experience }) => {

    const socials = Object.keys(data?.contact)
        .map((item, index) => {
            if (data?.contact[item].length > 0) {
                return <li className={classes['default-text']}><img src={icons[index]} alt="" />{data?.contact[item]}</li>
            }
        })
        .filter(item => item)
    const freelancerEducations = education?.map(edu => {
        const isUntill = edu.dateTo == null ? "Present" : new Date(edu.dateTo).getFullYear()
        return (
            <div className={classes.education__content}>
                <div className={classes.education__period}>
                    <span>{new Date(edu.dateFrom).getFullYear()} - {isUntill}</span><br />
                    {edu.name}
                </div>
                <div className={classes.education__name}>
                    <span>{degreeList[edu.degree].value}</span>
                    <p className={classes['default-text']}>{edu.location}</p>
                </div>
            </div>
        )
    })
    const freelancerExperiences = experience?.map(exp => {
        const isUntill = exp.dateTo == null ? "Present" : new Date(exp.dateTo).getFullYear()
        return (
            <div className={classes.education__content}>
                <div className={classes.education__period}>
                    <span>{new Date(exp.dateFrom).getFullYear()} - {isUntill}</span><br />
                    {exp.companyName}
                </div>
                <div className={classes.education__name}>
                    <p className={classes['education__name-title']}>{exp.job}</p>
                    <p className={classes['default-text']}>{exp.description}</p>
                </div>
            </div>
        )
    })

    return (
        <ResumeTemplate>
            <div className={classes['black-resume']}>
                <div className={classes['bg-decoration']}></div>
                <div className={classes.header}>
                    <div className={classes.header__inner}>
                        <div className={classes.header__img}>
                            <img src={data?.image} alt="" />
                        </div>
                        <div className={classes.header__info}>
                            <h2 className={classes.header__name}>{data?.name} {data?.surname}</h2>
                            <h6 className={classes.header__job}>{data?.position}</h6>
                            <div className={classes.header__contact}>
                                <div className={classes.header__phone}>
                                    Phone:<br /> <span>{data?.phone}</span>
                                </div>
                                <div className={classes.header__email}>
                                    E-mail:<br /> <span>{data?.email}</span>
                                </div>
                            </div>
                            <div className={classes.header__address}>
                                Address:<br /> <span>{country} {region} {data.street}</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.header__line} />
                </div>
                <div className={classes.body}>
                    <div className={classes.body__left}>
                        {
                            skills?.length > 0 &&
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
                            languages?.length > 0 &&
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
                            hobbies?.length > 0 &&
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
                            socials?.length > 0 &&
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
                            <p className={classes['default-text']}>{data?.description}</p>
                        </div>
                        {
                            freelancerEducations?.length > 0 &&
                            <div className={classes.education}>
                                <h3 className={classes['default-title']}>Education</h3>
                                {freelancerEducations}
                            </div>
                        }
                        {
                            freelancerExperiences?.length > 0 &&
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

export default SecondResume