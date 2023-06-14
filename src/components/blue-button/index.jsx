import classes from './index.module.css';

const BlueButton = ({type, title}) => {
    return (
        <button className={classes.button} type={type}>{title}</button>
    )
}

export default BlueButton