import React, { useState, useRef } from "react";
import "./Login.scss";
import sign_logo from "src/assets/images/Sign/sign_logo.svg";
// import login_circle from 'src/assets/images/Sign/login_circle.png'
import login_ellipse from "src/assets/images/Sign/Ellipse-6.png";
import apple from "src/assets/images/Sign/apple.svg";
import google from "src/assets/images/Sign/google.svg";
import github from "src/assets/images/Sign/github.svg";
import facebook from "src/assets/images/Sign/facebook.svg";
// import Company from "../component/Company";
// import Carusel from "../component/Carusel";
import { useDispatch, useSelector } from "react-redux";
import { logInRequest } from "src/reduxToolkit/extraReducers";
import { Eye, EyeOff } from 'tabler-icons-react';
import { Link } from "react-router-dom";
import Input from "src/components/Input";
import { useInput } from "src/hooks";
import BlueButton from "src/components/blue-button";
import { LOGIN_USER } from "src/api/URLS";

const Login = () => {
	const lang = useSelector(state => state.language.language)
	const [passwordEye, setPasswordEye] = useState('password');

	const passwordFunc = () => {
		setPasswordEye(prev => prev === 'password' ? 'text' : 'password')
	}

	// const email = useRef("");
	// const password = useRef("");
	// const dispatch = useDispatch();
	// const { loginResponseError, loggedIn } = useSelector(state => state.login);

	const {
		inputChange: emailInputChange,
		inputBlur: emailInputBlur,
		inputTouch: emailInputTouch,
		inputReset: emailInputClear,
		value: email,
		inputIsValid: emailIsValid,
		inputIsError: emailInputIsError,
	} = useInput(email => email.includes('@'))
	const {
		inputChange: passwordInputChange,
		inputBlur: passwordInputBlur,
		inputTouch: passwordInputTouch,
		inputReset: passwordInputClear,
		value: password,
		inputIsValid: passwordIsValid,
		inputIsError: passwordInputIsError
	} = useInput(password => password.trim().length > 0)

	const handleSubmit = e => {
		e.preventDefault();
		emailInputTouch();
		passwordInputTouch();

		if (emailIsValid && passwordIsValid) {
			const user = {
				email,
				password
			}
			fetch(LOGIN_USER, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user)
			})
				.then(res => {
					console.log(res);
					return res.json()
				})
				.then(data => console.log(data))
			// .catch(err => console.log(err))
		}
	};

	// const auth_path = location.pathname.split("/")[1];
	return (
		<div className="login_form">
			<form onSubmit={handleSubmit}>
				<h3 className="login_form_title">Log in</h3>
				<p className="login_form_info">
					Still don't have an account? <Link to={`/${lang}/sign-up`}><b>Sign up</b></Link> now!
				</p>
				<div className="login-content-wrapper">
					<Input
						type="email"
						placeholder="Email"
						inputIsError={emailInputIsError}
						value={email}
						inputChange={emailInputChange}
						inputBlur={emailInputBlur}
						errorMessage="Please enter valid eamil."
						autoComplete="on"
					/>
					<div style={{ 'position': 'relative' }} >
						<Input
							type={passwordEye}
							placeholder="Password"
							inputIsError={passwordInputIsError}
							value={password}
							inputChange={passwordInputChange}
							inputBlur={passwordInputBlur}
							errorMessage="Password should not be empty."
							autoComplete="off"
						/>
						<span className="password_span" onClick={passwordFunc} >
							{passwordEye === 'password' ? <EyeOff /> : <Eye />}
						</span>
					</div>
					<BlueButton type="submit" title="Continue" />
				</div>
			</form>
			<div className="login_form_wrapper">
				<p className="login_form_wrapper_info">Or continue with</p>

				<div className="login_form_wrapper_socials">
					<a href="facebook.com">
						<img className="login_form_wrapper_socials_icon" src={facebook} alt="social media icon facebook" />
					</a>
					<a href="facebook.com">
						<img className="login_form_wrapper_socials_icon" src={github} alt="social media icon github" />
					</a>
					<a href="facebook.com">
						<img className="login_form_wrapper_socials_icon" src={google} alt="social media google" />
					</a>
					<a href="facebook.com">
						<img className="login_form_wrapper_socials_icon" src={apple} alt="social media apple" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
