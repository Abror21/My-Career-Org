import CreatableSelect from 'react-select/creatable';
import classes from './CreatableInput.module.css'

const CreatableInput = ({ options, value, defaultValue, onChange, onBlur, selectIsError }) => {
  return (
    <CreatableSelect
      placeholder="Create a new"
      isMulti
      options={options}
      value={value}
      // defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      classNames={{
        control: (state) =>
          state.isFocused ? classes.backgroundRed : classes.backgroundBlur,
      }}
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
  )
}

export default CreatableInput;