import classes from './index.module.css';

const WhiteButton = ({ type, title, style, onChange }) => {
    return (
        <button className={classes.button} type={type} style={style} onClick={onChange}>{title}</button>
    )
}

export default WhiteButton