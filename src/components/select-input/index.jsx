import classes from './index.module.css';
import Select from 'react-select';

const SelectInput = ({ placeholder, options, value, defaultValue, selectIsError, errorMessage, selectChange, selectBlur, isMulti }) => {
    return (
        <div className={classes['select-input']}>
            <Select
                // isClearable={false}
                placeholder={placeholder}
                classNames={{
                    control: (state) =>
                        state.isFocused ? classes.backgroundRed : classes.backgroundBlur,
                }}
                options={options}
                value={value ? value : null}
                defaultValue={defaultValue}
                onChange={selectChange}
                onBlur={selectBlur}
                isMulti={isMulti}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: '100%',
                        padding: '8px',
                        fontSize: '20px',
                        borderRadius: '8px',
                        borderColor: selectIsError ? 'red' : '#cdcdcd',
                        "&:hover": 'unset'
                    }),
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        backgroundColor: isFocused ? "#eee" : null,
                        color: "#000"
                    })
                }}
            />
            {selectIsError && <p style={{ fontSize: '18px' }}>{errorMessage}</p>}
        </div>
    )
}

export default SelectInput;