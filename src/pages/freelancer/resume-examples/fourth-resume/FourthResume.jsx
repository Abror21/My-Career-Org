import ResumeTemplate from '../../resume-template/ResumeTemplate';
import classes from './FourthResume.module.css';
import imgDecor from 'src/assets/images/Freelancer/image-decor.png'
import phone from "src/assets/images/Freelancer/white-phone.png"
import email from "src/assets/images/Freelancer/white-mail.png"
import location from "src/assets/images/Freelancer/white-geo.png"
import website from 'src/assets/images/Freelancer/white-website.svg'
import watsapp from 'src/assets/images/Freelancer/white-watsapp.svg'
import facebook from 'src/assets/images/Freelancer/white-facebook.svg'
import instagram from 'src/assets/images/Freelancer/white-instagram.svg'
import telegram from 'src/assets/images/Freelancer/white-telegram.svg'
import github from 'src/assets/images/Freelancer/white-github.svg'
import twitter from 'src/assets/images/Freelancer/white-twitter.svg'
import decor1 from 'src/assets/images/Freelancer/fourth-right-decor-1.png'
import decor2 from 'src/assets/images/Freelancer/fourth-right-decor-2.png'
import decor3 from 'src/assets/images/Freelancer/fourth-right-decor-3.png'
import blueDot from 'src/assets/images/Freelancer/blue-dot.png'

const icons = [website, watsapp, facebook, instagram, telegram, github, twitter];

const FourthResume = ({ levelList, degreeList, data, country, region, skills, languages, hobbies, education, experience }) => {
    const socials = Object.keys(data?.contact)
        .map((item, index) => {
            if (data?.contact[item].length > 0) {
                return <li><img src={icons[index]} alt="" />{data?.contact[item]}</li>
            }
        })
        .filter(item => item)
    const freelancerEducations = education?.map(edu => {
        const isUntill = edu.dateTo == null ? "Present" : new Date(edu.dateTo).getFullYear()
        return (
            <div className={classes['right-section__item']}>
                <img className={classes['blue-dot']} src={blueDot} alt="" />
                <div className={classes['right-section__header']}>
                    <span>{degreeList[edu.degree].value}</span>
                    <span className={classes['right-section__content-date']}>{new Date(edu.dateFrom).getFullYear()} - {isUntill}</span>
                </div>
                <h6>{edu.name}</h6>
                <p>{edu.location}</p>
            </div>
        )
    })
    const freelancerExperiences = experience?.map(exp => {
        const isUntill = exp.dateTo == null ? "Present" : new Date(exp.dateTo).getFullYear()
        return (
            <div className={classes['right-section__item']}>
                <img className={classes['blue-dot']} src={blueDot} alt="" />
                <div className={classes['right-section__header']}>
                    <span>{exp.job}</span>
                    <span>
                        {new Date(exp.dateFrom).getFullYear()} - {isUntill}
                    </span>
                </div>
                <h6>{exp.companyName}</h6>
                <p>{exp.description}</p>
            </div>
        )
    })
    return (
        <ResumeTemplate>
            <div className={classes['fourth-resume']}>

                <div className={classes['fourth-resume__left']}>
                    <img className={classes['img-decor']} src={imgDecor} alt="" />
                    <img className={classes['fourth-resume__img']} src={data?.image} alt="" />
                    <ul className={classes['contact-list']}>
                        <li><img src={phone} alt="" />{data?.phone}</li>
                        <li><img src={email} alt="" />{data?.email}</li>
                        <li><img src={location} alt="" />{country} {region} {data.street}</li>
                    </ul>
                    <div className={classes['fourth__left-content']}>
                        {
                            skills?.length > 0 &&
                            <div>
                                <h5 className={classes['default-white-title']}>skills</h5>
                                <ul>
                                    {
                                        skills?.map(skill => <li>{skill.skill.content}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            languages?.length > 0 &&
                            <div>
                                <h5 className={classes['default-white-title']}>languages</h5>
                                <ul>
                                    {
                                        languages?.map(lang => <li>{lang.language.name} - {levelList[lang.level].value}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            hobbies?.length > 0 &&
                            <div>
                                <h5 className={classes['default-white-title']}>hobbies</h5>
                                <ul>
                                    {
                                        hobbies?.map(hobby => <li>{hobby.hobby.content}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            socials?.length > 0 &&
                            <div>
                                <h5 className={classes['default-white-title']}>contacts</h5>
                                <ul>
                                    {socials}
                                </ul>
                            </div>
                        }
                    </div>
                </div>

                <div className={classes['right']}>
                    <img className={classes.decor1} src={decor1} alt="" />
                    <img className={classes.decor3} src={decor3} alt="" />
                    <div className={classes['right__title']}>
                        <h3 className={classes['right-title']}>{data?.name} <b>{data?.surname}</b></h3>
                        <span className={classes['right-subtitle']}>{data?.position}</span>
                    </div>
                    <img className={classes.decor2} src={decor2} alt="" />
                    <div className={classes['right__about']}>
                        <h6>about me</h6>
                        <p>{data?.description}</p>
                    </div>
                    <div className={classes['right-content']}>
                        {
                            freelancerEducations?.length > 0 &&
                            <div>
                                <h5 className={classes['default-blue-title']}>Education</h5>
                                <div className={classes['right-section']}>
                                    {freelancerEducations}
                                </div>
                            </div>
                        }
                        {
                            freelancerExperiences?.length > 0 &&
                            <div>
                                <h5 className={classes['default-blue-title']}>experience</h5>
                                <div className={classes['right-section']}>
                                    {freelancerExperiences}
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </ResumeTemplate>
    )
}

export default FourthResume