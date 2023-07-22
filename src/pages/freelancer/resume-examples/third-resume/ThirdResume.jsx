import ResumeTemplate from '../../resume-template/ResumeTemplate';
import classes from './ThirdResume.module.css';
import freelancer from "src/assets/images/Freelancer/defaultUserImage.png"
import phone from "src/assets/images/Freelancer/phone-img.png"
import email from "src/assets/images/Freelancer/pochta-img.png"
import watsapp from 'src/assets/images/Freelancer/whatsapp-icon.png'
import facebook from 'src/assets/images/Freelancer/facebook-icon.png'

const ThirdResume = () => {
    return (
        <ResumeTemplate>
            <div className={classes['third-resume']}>

                <div className={classes['third-resume__left']}>
                    <img src={freelancer} className={classes['user-img']} alt="" />
                    <ul className={classes['user-contacts']}>
                        <li className={classes['user-contacts__item']}>
                            <h6>
                                <img src={phone} alt="" />
                                Phone
                            </h6>
                            <span>+99890 000 00 00</span>
                        </li>
                        <li className={classes['user-contacts__item']}>
                            <h6>
                                <img src={email} alt="" />
                                Email
                            </h6>
                            <span>user@gmail.com</span>
                        </li>
                        <li className={classes['user-contacts__item']}>
                            <h6>
                                <img src={email} alt="" />
                                Email
                            </h6>
                            <span>user@gmail.com</span>
                        </li>
                        <li className={classes['user-contacts__item']}>
                            <h6>
                                <img src={email} alt="" />
                                Address
                            </h6>
                            <span>Tashkent Uchtepa Kokcha-oqtepa pr3344</span>
                        </li>
                    </ul>
                    <div className={classes['third-resume__content']}>
                        <div>
                            <h4 className={classes['default-title']}>skills</h4>
                            <ul className={classes['info-list']}>
                                <li>Photoshop</li>
                                <li>Figma</li>
                                <li>Adobe xD</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className={classes['default-title']}>languages</h4>
                            <ul className={classes['info-list']}>
                                <li>Uzbek - level</li>
                                <li>Uzbek - level</li>
                                <li>Uzbek - level</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className={classes['default-title']}>hobbies</h4>
                            <ul className={classes['info-list']}>
                                <li>Football</li>
                                <li>Swimming</li>
                                <li>Reading</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className={classes['default-title']}>contacts</h4>
                            <ul className={classes['info-list']}>
                                <li className={classes['contacts__list-item']}><img src={watsapp} alt="" /> Murphy_design_2001</li>
                                <li className={classes['contacts__list-item']}><img src={facebook} alt="" /> Murphy_design_2001</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={classes['third-resume__right']}>
                    <div className={classes['user-header']}>
                        <h2 className={classes['user-name']}><b>MICHEL</b> RIGAURIO</h2>
                        <span className={classes['user-profession']}>PROFESSIONAL TITLE</span>
                    </div>
                    <div className={classes['third-resume__right-content']}>
                        <div>
                            <h3 className={classes['right-title']}>about me</h3>
                            <p className={classes['default-text']}>
                                Everything is a bit different nowadays. The word "art" has a special meaning. It means something beautiful. The paintings of skilled painters are appreciated and admired by millions of people today,
                            </p>
                        </div>
                        <div>
                            <h3 className={classes['right-title']}>Education</h3>
                            <div className={classes['education-items']}>
                                <div className={classes['education-item']}>
                                    <span className={classes['education-item__left']}>2019 - Present</span>
                                    <div className={classes['education-item__right']}>
                                        <h6>Enter Uni</h6>
                                        <ul>
                                            <li>Degree</li>
                                            <li>Type of study</li>
                                            <li>Location</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes['education-item']}>
                                    <span className={classes['education-item__left']}>2019 - 2022</span>
                                    <div className={classes['education-item__right']}>
                                        <h6>Enter Uni</h6>
                                        <ul>
                                            <li>Degree</li>
                                            <li>Type of study</li>
                                            <li>Location</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className={classes['right-title']}>Experience</h3>
                            <div className={classes['education-items']}>
                                <div className={classes['education-item']}>
                                    <span className={classes['education-item__left']}>2019 - Present</span>
                                    <div className={classes['education-item__right']}>
                                        <h6>Senior Frontend</h6>
                                        <ul>
                                            <li className={classes['company-name']}>Name of company</li>
                                            <li>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum facere debitis hic tenetur temporibus recusandae ullam expedita non beatae. Beatae quam quisquam est quibusdam repellat voluptatibus rem atque id quas!
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes['education-item']}>
                                    <span className={classes['education-item__left']}>2019 - Present</span>
                                    <div className={classes['education-item__right']}>
                                        <h6>Senior Frontend</h6>
                                        <ul>
                                            <li className={classes['company-name']}>Name of company</li>
                                            <li>
                                                Lorem ipsum dolor sit amet sicing elit. Voluptatum facere debitis hic tenetur temporib. Beatae quam quisquam est quibusdam repellat voluptatibus rem atque id quas!
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </ResumeTemplate>
    )
}

export default ThirdResume