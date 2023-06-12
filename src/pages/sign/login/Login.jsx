import React, { useState, useRef } from "react";
import "./Login.scss";
import sign_logo from "../../../assets/images/Sign/sign_logo.svg";
// import login_circle from '../../../assets/images/Sign/login_circle.png'
import login_ellipse from "../../../assets/images/Sign/Ellipse-6.png";
import apple from "../../../assets/images/Sign/apple.svg";
import google from "../../../assets/images/Sign/google.svg";
import github from "../../../assets/images/Sign/github.svg";
import facebook from "../../../assets/images/Sign/facebook.svg";
// import Company from "../component/Company";
// import Carusel from "../component/Carusel";
import { useDispatch, useSelector } from "react-redux";
import { logInRequest } from "../../../reduxToolkit/extraReducers.js";
import { Eye, EyeOff } from 'tabler-icons-react';
import { Link } from "react-router-dom";

const Login = () => {
	const [passwordEye, setPasswordEye] = useState('password');

	const passwordFunc = () => {
		setPasswordEye(prev => prev === 'password' ? 'text' : 'password')
	}

	const email = useRef("");
	const password = useRef("");
	const dispatch = useDispatch();
	const { loginResponseError, loggedIn } = useSelector(state => state.login);
	const lang = useSelector(state => state.language.language)

	const handleSubmit = event => {
		event.preventDefault();
		let payload = {
			email: email.current.value,
			password: password.current.value
		};
		dispatch(logInRequest(payload));
	};

	// const auth_path = location.pathname.split("/")[1];
	return (
		<form className="login_form" onSubmit={handleSubmit}>
			<h3 className="login_form_title">Log in</h3>
			<p className="login_form_info">
				Still don't have an account? <Link to={`/${lang}/sign-up`}><b>Sign up</b></Link> now!
			</p>
			<input
				ref={email}
				required
				className={`login_form_inp ${loginResponseError ? "register-danger-input " : loginResponseError ? "register-success" : ""}`}
				type="email"
				placeholder="Email"
				name="email"
				autoComplete="off"
			/>
			{
				loginResponseError && <p className="register-danger-text">{loginResponseError}</p>
			}
			<div style={{ 'position': 'relative' }} >
				<input
					ref={password}
					required
					className={`login_form_inp login_form_inp2 ${loginResponseError ? "register-danger-input " : loginResponseError ? "register-success" : ""}`}
					type={passwordEye}
					placeholder="Password"
					name="password"
					autoComplete="off"
				/>
				<span className="password_span" onClick={passwordFunc} >
					{passwordEye === 'password' ? <EyeOff /> : <Eye />}
				</span>
			</div>
			{
				loginResponseError
				&&
				<p className="register-danger-text">{loginResponseError}</p>
			}

			<button type="submit" className="login_form_btn">Continue</button>

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
		</form>

		// <section className="login">
		// 	<Carusel />
		// 	<div className="login_container">
		// 		<img className="login_bg_img" src={login_ellipse} alt="login background images" />
		// 		<div className="login_container_wrapper">
		// 			{
		// 				!loggedIn ?
		// 					<>
		// 						<img src={sign_logo} className="login_container_wrapper_logo" alt="" />
		// 						<form className="login_form" onSubmit={handleSubmit}>
		// 							<h3 className="login_form_title">Log in</h3>
		// 							<p className="login_form_info">
		// 								Still don't have an account? <Link to={`/${lang}/sign-up`}>Sign up</Link> now!
		// 							</p>
		// 							<input
		// 								ref={email}
		// 								required
		// 								className={`login_form_inp ${loginResponseError ? "register-danger-input " : loginResponseError ? "register-success" : ""}`}
		// 								type="email"
		// 								placeholder="Email"
		// 								name="email"
		// 								autoComplete="off"
		// 							/>
		// 							{
		// 								loginResponseError && <p className="register-danger-text">{loginResponseError}</p>
		// 							}
		// 							<div style={{ 'position': 'relative' }} >
		// 								<input
		// 									ref={password}
		// 									required
		// 									className={`login_form_inp login_form_inp2 ${loginResponseError ? "register-danger-input " : loginResponseError ? "register-success" : ""}`}
		// 									type={passwordEye}
		// 									placeholder="Password"
		// 									name="password"
		// 									autoComplete="off"
		// 								/>
		// 								<span className="password_span" onClick={() => passwordFunc()} >
		// 									{
		// 										// passwordEye === 'password' ? <EyeOff /> : <Eye />
		// 									}
		// 								</span>
		// 							</div>
		// 							{
		// 								loginResponseError
		// 								&&
		// 								<p className="register-danger-text">{loginResponseError}</p>
		// 							}

		// 							<button type="submit" className="login_form_btn">
		// 								Continue
		// 							</button>

		// 							<div className="login_form_wrapper">
		// 								<p className="login_form_wrapper_info">Or continue with</p>

		// 								<div className="login_form_wrapper_socials">
		// 									<a href="facebook.com">
		// 										<img className="login_form_wrapper_socials_icon" src={facebook} alt="social media icon facebook" />
		// 									</a>
		// 									<a href="facebook.com">
		// 										<img className="login_form_wrapper_socials_icon" src={github} alt="social media icon github" />
		// 									</a>
		// 									<a href="facebook.com">
		// 										<img className="login_form_wrapper_socials_icon" src={google} alt="social media google" />
		// 									</a>
		// 									<a href="facebook.com">
		// 										<img className="login_form_wrapper_socials_icon" src={apple} alt="social media apple" />
		// 									</a>
		// 								</div>
		// 							</div>
		// 						</form>
		// 					</>
		// 					:
		// 					<Company />
		// 			}
		// 		</div>
		// 	</div>
		// </section>
	);
};

export default Login;
