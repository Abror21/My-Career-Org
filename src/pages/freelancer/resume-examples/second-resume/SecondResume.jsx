import ResumeTemplate from "../../resume-template/ResumeTemplate"
import classes from './SecondResume.module.css';
import freelancer from 'src/assets/images/Freelancer/defaultUserImage.png'
import phone from 'src/assets/images/Freelancer/phone-img.png'
import email from 'src/assets/images/Freelancer/pochta-img.png'
import location from 'src/assets/images/Freelancer/geo-img.png'
import watsapp from 'src/assets/images/Freelancer/whatsapp-icon.png'
import facebook from 'src/assets/images/Freelancer/facebook-icon.png'

const SecondResume = () => {
    return (
        <ResumeTemplate>
            <div className={classes['black-resume']}>
                <div className={classes['bg-decoration']}></div>
                <div className={classes.header}>
                    <div className={classes.header__inner}>
                        <div className={classes.header__img}>
                            <img src={freelancer} alt="" />
                        </div>
                        <div className={classes.header__info}>
                            <h2 className={classes.header__name}>John Smith</h2>
                            <h6 className={classes.header__job}>Marketing Specialist</h6>
                            <div className={classes.header__contact}>
                                <div className={classes.header__phone}>
                                    Phone:<br /> <span>+99890 000 00 00</span>
                                </div>
                                <div className={classes.header__email}>
                                    E-mail:<br /> <span>user@name.com</span>
                                </div>
                            </div>
                            <div className={classes.header__address}>
                                Address:<br /> <span>Tashkent, Uchtepa Kokcha-oqtepa, pr3, 344</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.header__line} />

                </div>

                <div className={classes.body}>
                    <div className={classes.body__left}>

                        <div className={classes.skills}>
                            <h3 className={classes["default-title"]}>Skills</h3>
                            <ul className={classes.skills__list}>
                                <li className={classes['default-text']}>Photoshop</li>
                                <li className={classes['default-text']}>Figma</li>
                                <li className={classes['default-text']}>Adobe xD</li>
                            </ul>
                        </div>
                        <div className={classes.languages}>
                            <h3 className={classes["default-title"]}>Languages</h3>
                            <ul className={classes.languages__list}>
                                <li className={classes['default-text']}>English - level</li>
                                <li className={classes['default-text']}>French - level</li>
                                <li className={classes['default-text']}>Korean - level</li>
                                <li className={classes['default-text']}>Uzbek - level</li>
                            </ul>
                        </div>
                        <div className={classes.hobbies}>
                            <h3 className={classes["default-title"]}>Hobbies</h3>
                            <ul className={classes.hobbies__list}>
                                <li className={classes['default-text']}>Photoshop</li>
                                <li className={classes['default-text']}>Figma</li>
                                <li className={classes['default-text']}>Adobe xD</li>
                            </ul>
                        </div>
                        <div className={classes.contacts}>
                            <h3 className={classes["default-title"]}>Contacts</h3>
                            <ul className={classes.contacts__list}>
                                <li className={classes['default-text']}><img src={watsapp} alt="" /> Murphy_design_2001</li>
                                <li className={classes['default-text']}><img src={facebook} alt="" /> Murphy_design_2001</li>
                            </ul>
                        </div>
                    </div>

                    <div className={classes.body__right}>

                        <div className={classes.about}>
                            <h3 className={classes['default-title']}>About me</h3>
                            <p className={classes['default-text']}>
                                In my current position at ABC, I have supervised all phases of our online marketing initiatives, both technical and creative. Last year, my key challeng was to design and optimize nine product websites for ABC's most strategic products and improve our SO results as well as enhance the UX. Here we are a year later:
                            </p>
                        </div>

                        <div className={classes.education}>
                            <h3 className={classes['default-title']}>Education</h3>
                            <div className={classes.education__content}>
                                <div className={classes.education__period}>
                                    2012 - 2014<br />
                                    University name
                                </div>
                                <div className={classes.education__name}>
                                    <span>Degree Name</span>
                                    <p className={classes['default-text']}>
                                        Lorem Ipsum Issyk simply dummy text offset the printing and typesetting
                                        industry.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={classes.education}>
                            <h3 className={classes['default-title']}>Experience</h3>
                            <div className={classes.education__content}>
                                <div className={classes.education__period}>
                                    2012 - 2014<br />
                                    Company Name
                                </div>
                                <div className={classes.education__name}>
                                    <span>Senior UX Designer</span>
                                    <p className={classes['default-text']}>
                                        Lorem Ipsum Issyk simply dummy text offset the printing and typesetting
                                        industry.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </ResumeTemplate>
    )
}

export default SecondResume