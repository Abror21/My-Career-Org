import classes from './index.module.css';

const WhiteButton = ({ type, title, style, onClick }) => {
    return (
        <button className={classes.button} type={type} style={style} onClick={onClick}>{title}</button>
    )
}

export default WhiteButton