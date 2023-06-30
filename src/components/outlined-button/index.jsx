import classes from './index.module.css';

const OutlinedButton = ({ type, title, style }) => {
    return (
        <button type={type} className={classes.button} style={style}>{title}</button>
    )
}

export default OutlinedButton