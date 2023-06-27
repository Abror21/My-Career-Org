import classes from './index.module.css';

const WhiteButton = ({ type, title, onChange }) => {
    return (
        <button className={classes.button} type={type} onClick={onChange}>{title}</button>
    )
}

export default WhiteButton