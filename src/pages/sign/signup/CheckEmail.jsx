import './CheckEmail.scss'
import emailImg from 'src/assets/images/Sign/email.png'
import { useSelector  } from 'react-redux';
import { Link } from 'react-router-dom';

const CheckEmail = ({ email }) => {
    const lang = useSelector(state => state.language.language)

    return (
        <>
            <div className="check_email">
                <h2 className="check_email_title">Check your email</h2>
                <img src={emailImg} alt="check email images" />
                <p className='check_email_info'>Check your <b>{email}</b> inbox for instructions from us on how to verify your account.</p>
                <Link to={`/${lang}/login`} className='check_email_link'>Go to login screen</Link>
            </div>
        </>
    );
};

export default CheckEmail;