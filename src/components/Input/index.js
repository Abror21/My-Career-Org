import InputMask from 'react-input-mask';
import classes from './index.module.css'

const Input = ({
        mask,
        type,
        label,
        placeholder,
        inputIsError,
        value,
        inputChange,
        inputBlur,
        errorMessage,
        autoComplete,
        isExist
    }) => {
    
    return (
        <div className={classes.input}>
            <label className={`${inputIsError || isExist ? 'text-danger' : ''}`}>{label}</label>
            <InputMask
                mask={mask}
                maskChar={null}
                style={{borderColor: `${inputIsError || isExist ? 'red' : ''}`}}
                type={type}
                className={`${inputIsError ? 'border-danger' : ''}`}
                value={value}
                onChange={inputChange}
                onBlur={inputBlur}
                placeholder={placeholder}
                valueIsNumericString={true}
                autoComplete={autoComplete}
            />
            {inputIsError && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {isExist && <p style={{ color: 'red' }}>Email already exists.</p>}
        </div>
    )
}

export default Input;