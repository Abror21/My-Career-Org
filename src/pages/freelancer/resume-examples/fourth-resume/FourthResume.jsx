import ResumeTemplate from '../../resume-template/ResumeTemplate';
import classes from './FourthResume.module.css';
import userImg from 'src/assets/images/Freelancer/defaultUserImage.png'
import imgDecor from 'src/assets/images/Freelancer/image-decor.png'

const FourthResume = () => {
    return (
        <ResumeTemplate>
            <div className={classes['fourth-resume']}>

                <img className={classes['img-decor']} src={imgDecor} alt="" />
                <img className={classes['fourth-resume__img']} src={userImg} alt="" />

                <div className={classes['fourth-resume__left']}>

                </div>

                <div className={classes['fourth-resume__right']}>

                </div>

            </div>
        </ResumeTemplate>
    )
}

export default FourthResume