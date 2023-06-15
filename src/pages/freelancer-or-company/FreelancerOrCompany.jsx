import { useNavigate } from 'react-router-dom';
import classes from './FreelancerOrCompany.module.css';
import { useSelector } from 'react-redux';

const FreelanceOrCompany = () => {
  const userToken = localStorage.getItem('user-token');
  const lang = useSelector(state => state.language.language);
  const navigate = useNavigate();
  if (!userToken) {
    navigate(`/${lang}/login`)
  }

  return (
    <div className={classes.wrapper}>
      <button className={classes.back} onClick={() => navigate(-1)}>&larr;</button>
      <div
        className={classes.freelancer}
        onClick={() => navigate(`/${lang}/freelancer`)}
      >
        <h1>Freelancer</h1>
      </div>
      <div
        className={classes.company}
        onClick={() => navigate(`/${lang}/company`)}
      >
        <h1>Company</h1>
      </div>
    </div>
  )
}

export default FreelanceOrCompany;