import { useNavigate } from 'react-router-dom';
import classes from './CompanyResume.module.css';

const CompanyResume = () => {
  const navigate = useNavigate();
  return (
    <div className={classes['company-resume']}>
      <h1 className={classes.title}>Company Resume</h1>
      <button className={classes.back} onClick={() => navigate(-1)}>&larr;</button>
    </div>
  )
}

export default CompanyResume