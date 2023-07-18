import classes from './ResumeTemplate.module.css';

const ResumeTemplate = ({ children }) => {
    return (
        <div className={classes.template}>
            {children}
        </div>
    )
}

export default ResumeTemplate