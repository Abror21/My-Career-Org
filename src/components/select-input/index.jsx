import classes from './index.module.css';
import Select from 'react-select';

const SelectInput = ({ placeholder, options, value, selectIsError, errorMessage, selectChange, selectBlur }) => {
    return (
        <div>
            <Select
                className={classes['select-input']}
                placeholder={placeholder}
                options={options}
                value={value ? undefined : null}
                onChange={selectChange}
                onBlur={selectBlur}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: '9px',
                        borderRadius: '8px',
                        borderColor: selectIsError ? 'red' : '#cdcdcd',
                        "&:hover": 'unset'
                    })
                }}
            />
            {selectIsError && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}

export default SelectInput;