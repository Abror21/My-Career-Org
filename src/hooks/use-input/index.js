import { useReducer } from "react";

const initialState = { value: '', touched: false, isExist: false, timer: null };

const reducer = (state, action) => {
  if (action.type === 'VALUE') {
    return { ...state, value: action.value };
  }
  else if (action.type === 'RESET') {
    return { ...state, value: '', touched: false }
  } else if (action.type === 'BLUR') {
    return { ...state, touched: true }
  } else if (action.type === 'EXIST') {
    return { ...state, isExist: true }
  } else if (action.type === 'NOTEXIST') {
    return { ...state, isExist: false }
  }
  return state;
}

export const useInput = (inputValidation = () => { }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const inputChange = (value) => {
    dispatch({ type: "VALUE", value });
  }
  const inputBlur = () => {
    dispatch({ type: "BLUR" });
  }
  const inputTouch = () => {
    dispatch({ type: "BLUR" })
  }
  const inputReset = () => {
    dispatch({ type: "RESET" })
  }

  let inputIsValid = inputValidation(state.value);
  let inputIsError = state.touched && !inputIsValid;

  return {
    inputChange,
    inputBlur,
    inputTouch,
    inputReset,
    value: state.value,
    inputIsValid,
    inputIsError,
    isExist: state.isExist,
  }
}