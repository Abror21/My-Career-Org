import classes from './index.module.css';

const OutlinedButton = ({ type, title, style, onClick }) => {
    return (
        <button type={type} className={classes.button} style={style} onClick={onClick}>{title}</button>
    )
}

export default OutlinedButton