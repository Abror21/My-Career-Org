import classes from './index.module.css';
import Select from 'react-select';

const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        // const color = chroma(data.color);
        console.log({ data, isDisabled, isFocused, isSelected });
        return {
            ...styles,
            backgroundColor: isFocused ? "#999999" : null,
            color: "#333333"
        };
    }
};

const SelectInput = ({ placeholder, options, value, selectIsError, errorMessage, selectChange, selectBlur }) => {
    return (
        <div className={classes['select-input']}>
            <Select
                placeholder={placeholder}
                classNames={{
                    control: (state) =>
                        state.isFocused ? classes.backgroundRed : classes.backgroundBlur,
                }}
                options={options}
                value={value ? undefined : null}
                onChange={selectChange}
                onBlur={selectBlur}
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