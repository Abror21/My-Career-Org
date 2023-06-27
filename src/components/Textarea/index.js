import classes from './index.module.css'

const Textarea = ({ label, placeholder, inputIsError, value, inputChange, inputBlur, errorMessage }) => {

    return (
        <div className={classes.textarea}>
            <label className={`${inputIsError ? 'text-danger' : ''}`}>{label}</label>
            <textarea
                style={{ borderColor: `${inputIsError ? 'red' : ''}` }}
                className={`${inputIsError ? 'border-danger' : ''}`}
                value={value}
                onChange={e => inputChange(e.target.value)}
                onBlur={inputBlur}
                placeholder={placeholder}
                rows="4"
            />
            {inputIsError && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}

export default Textarea;