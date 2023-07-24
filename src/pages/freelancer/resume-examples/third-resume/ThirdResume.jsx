import ResumeTemplate from '../../resume-template/ResumeTemplate';
import classes from './ThirdResume.module.css';
import freelancer from "src/assets/images/Freelancer/defaultUserImage.png"
import phone from "src/assets/images/Freelancer/phone-img.png"
import email from "src/assets/images/Freelancer/pochta-img.png"
import website from 'src/assets/images/Freelancer/white-website.svg'
import watsapp from 'src/assets/images/Freelancer/white-watsapp.svg'
import facebook from 'src/assets/images/Freelancer/white-facebook.svg'
import instagram from 'src/assets/images/Freelancer/white-instagram.svg'
import telegram from 'src/assets/images/Freelancer/white-telegram.svg'
import github from 'src/assets/images/Freelancer/white-github.svg'
import twitter from 'src/assets/images/Freelancer/white-twitter.svg'

const icons = [website, watsapp, facebook, instagram, telegram, github, twitter];
const typeOfStudy = ['Online', 'Offline'];
const ThirdResume = ({ levelList, degreeList, data, country, region, skills, languages, hobbies, education, experience }) => {
    const socials = Object.keys(data?.contact)
        .map((item, index) => {
            if (data?.contact[item].length > 0) {
                return <li className={classes['contacts__list-item']}><img src={icons[index]} alt="" />{data?.contact[item]}</li>
            }
        })
        .filter(item => item)
    const freelancerEducations = education?.map(edu => {
        const isUntill = edu.dateTo == null ? "Present" : new Date(edu.dateTo).getFullYear()
        return (
            <div className={classes['education-item']}>
                <span className={classes['education-item__left']}>{new Date(edu.dateFrom).getFullYear()} - {isUntill}</span>
                <div className={classes['education-item__right']}>
                    <h6>{edu.name}</h6>
                    <ul>
                        <li>{degreeList[edu.degree].value}</li>
                        <li>{typeOfStudy[edu.typeOfStudy]}</li>
                        <li>{edu.location}</li>
                    </ul>
                </div>
            </div>
        )
    })
    const freelancerExperiences = experience?.map(exp => {
        const isUntill = exp.dateTo == null ? "Present" : new Date(exp.dateTo).getFullYear()
        return (
            <div className={classes['education-item']}>
                <span className={classes['education-item__left']}>{new Date(exp.dateFrom).getFullYear()} - {isUntill}</span>
                <div className={classes['education-item__right']}>
                    <h6>{exp.job}</h6>
                    <ul>
                        <li className={classes['company-name']}>{exp.companyName}</li>
                        <li>{exp.description}</li>
                    </ul>
                </div>
            </div>
        )
    })
    return (
        <ResumeTemplate>
            <div className={classes['third-resume']}>
                <div className={classes['third-resume__left']}>
                    <img src={data?.image} className={classes['user-img']} alt="" />
                    <ul className={classes['user-contacts']}>
                        <li className={classes['user-contacts__item']}>
                            <h6>
                                <img src={phone} alt="" />
                                Phone
                            </h6>
                            <span>{data?.phone}</span>
                        </li>
                        <li className={classes['user-contacts__item']}>
                            <h6>
                                <img src={email} alt="" />
                                Email
                            </h6>
                            <span>{data?.email}</span>
                        </li>
                        <li className={classes['user-contacts__item']}>
                            <h6>
                                <img src={email} alt="" />
                                Address
                            </h6>
                            <span>{country} {region} {data.street}</span>
                        </li>
                    </ul>
                    <div className={classes['third-resume__content']}>
                        {
                            skills?.length > 0 &&
                            <div>
                                <h4 className={classes['default-title']}>skills</h4>
                                <ul className={classes['info-list']}>
                                    {
                                        skills?.map(skill => <li>{skill.skill.content}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            languages?.length > 0 &&
                            <div>
                                <h4 className={classes['default-title']}>languages</h4>
                                <ul className={classes['info-list']}>
                                    {
                                        languages?.map(lang => <li>{lang.language.name} - {levelList[lang.level].value}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            hobbies?.length > 0 &&
                            <div>
                                <h4 className={classes['default-title']}>hobbies</h4>
                                <ul className={classes['info-list']}>
                                    {
                                        hobbies?.map(hobby => <li>{hobby.hobby.content}</li>)
                                    }
                                </ul>
                            </div>
                        }
                        {
                            socials?.length > 0 &&
                            <div>
                                <h4 className={classes['default-title']}>contacts</h4>
                                <ul className={classes['info-list']}>
                                    {socials}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <div className={classes['third-resume__right']}>
                    <div className={classes['user-header']}>
                        <h2 className={classes['user-name']}><b>{data?.name}</b> {data?.surname}</h2>
                        <span className={classes['user-profession']}>{data?.position}</span>
                    </div>
                    <div className={classes['third-resume__right-content']}>
                        <div>
                            <h3 className={classes['right-title']}>about me</h3>
                            <p className={classes['default-text']}>{data?.description}</p>
                        </div>
                        {
                            freelancerEducations?.length > 0 &&
                            <div>
                                <h3 className={classes['right-title']}>Education</h3>
                                <div className={classes['education-items']}>
                                    {freelancerEducations}
                                </div>
                            </div>
                        }
                        {
                            freelancerExperiences?.length > 0 &&
                            <div>
                                <h3 className={classes['right-title']}>Experience</h3>
                                <div className={classes['education-items']}>
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

export default ThirdResume