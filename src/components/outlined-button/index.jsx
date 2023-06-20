import classes from './index.module.css';

const OutlinedButton = ({type, title}) => {
    return (
        <button type={type} className={classes.button}>{title}</button>
    )
}

export default OutlinedButton