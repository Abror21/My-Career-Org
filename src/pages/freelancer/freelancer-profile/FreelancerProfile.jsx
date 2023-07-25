import { useNavigate } from 'react-router-dom';
import classes from './FreelancerProfile.module.css';
import left_arrow from "src/assets/images/Sign/left_arrow.svg";
import { useSelector } from 'react-redux';

const FreelancerProfile = () => {
    const lang = useSelector(state => state.language.language);
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    }
    const onHomeClick = () => {
        navigate(`/${lang}/home`)
    }

    return (
        <div className={classes['freelancer-profile']}>
            <button className={classes.back} onClick={onBackClick}>
                <img src={left_arrow} alt="left arrow icon" /> Back
            </button>
            <button className={classes.home} onClick={onHomeClick}>
                Home
            </button>

            <div className={classes['freelancer-profile__content']}>WELCOME TO THE PLATFORM</div>
        </div>
    )
}

export default FreelancerProfile