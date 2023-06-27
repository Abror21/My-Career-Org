import InputMask from 'react-input-mask';
import classes from './index.module.css'

const Input = ({
    mask,
    type,
    label,
    placeholder,
    inputIsError,
    value,
    disabled,
    inputChange,
    inputBlur,
    errorMessage,
    autoComplete,
    isExist
}) => {

    return (
        <div className={classes.input}>
            <label
                htmlFor='input'
                style={{ display: label ? '' : 'none' }}
                className={`${classes.label} ${inputIsError || isExist ? classes.error : ''}`}
            >{label}</label>
            <InputMask
                mask={mask}
                maskChar={null}
                style={{ borderColor: `${inputIsError || isExist ? 'red' : ''}`, background: disabled ? '#eee' : '' }}
                type={type}
                className={`${inputIsError ? classes['error-border'] : ''}`}
                value={disabled ? '' : value}
                disabled={disabled}
                onChange={e => inputChange(e.target.value)}
                onBlur={inputBlur}
                placeholder={placeholder}
                valueIsNumericString={true}
                autoComplete={autoComplete}
                id='input'
            />
            {inputIsError && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {isExist && <p style={{ color: 'red' }}>Email already exists.</p>}
        </div>
    )
}

export default Input;