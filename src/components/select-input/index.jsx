import classes from './index.module.css';
import Select from 'react-select';

const SelectInput = ({ placeholder, options, value, selectIsError, errorMessage, selectChange, selectBlur }) => {
    return (
        <div className={classes['select-input']}>
            <Select
                placeholder={placeholder}
                options={options}
                value={value ? undefined : null}
                onChange={selectChange}
                onBlur={selectBlur}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: '100%',
                        padding: '9px',
                        borderRadius: '8px',
                        borderColor: selectIsError ? 'red' : '#cdcdcd',
                        "&:hover": 'unset'
                    })
                }}
            />
            {selectIsError && <p>{errorMessage}</p>}
        </div>
    )
}

export default SelectInput;