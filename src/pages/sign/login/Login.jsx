import React, { useState } from "react";
import "./Login.scss";
import apple from "src/assets/images/Sign/apple.svg";
import google from "src/assets/images/Sign/google.svg";
import github from "src/assets/images/Sign/github.svg";
import facebook from "src/assets/images/Sign/facebook.svg";
import { useSelector } from "react-redux";
import { Eye, EyeOff } from 'tabler-icons-react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { useInput } from "src/hooks";
import BlueButton from "src/components/blue-button";
import { API } from "src/services/api";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import GitHubLogin from "react-github-login";


const Login = ({ style }) => {
	const lang = useSelector(state => state.language.language)
	const [passwordEye, setPasswordEye] = useState('password');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate()

	const passwordFunc = () => {
		setPasswordEye(prev => prev === 'password' ? 'text' : 'password')
	}
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
			const user = { email, password }
			setLoading(true)
			API.loginUser(user)
				.then(res => {
					if (res.status === 200) {
						localStorage.setItem('user-token', res.data.token);
						emailInputClear();
						passwordInputClear();
						navigate(`/${lang}/freelancer-or-company`);
					}
				})
				.catch(err => {
					toast.error(err.message);
					toast.error(err.response?.data?.message, { position: toast.POSITION.TOP_LEFT });
				})
				.finally(() => setLoading(false))
		}
	};

	// githubId = c6f2234c775eade1e332
	// const loginWithGitHub = (git) => {
	// 	window.location.assign(`http://localhost:3000/en/login/oauth/authorize?client_id=c6f2234c775eade1e332`);
	// }

	// const location = useLocation();
	// console.log(process.env.REACT_APP_CLIENT_ID);
	// navigate(process.env.REACT_APP_CLIENT_ID);
	// let from = ((location.state)?.from?.pathname) || '/';

	// function getGitHubUrl() {
	// 	console.log('process ', process.env);
	// 	const rootURl = 'https://github.com/login/oauth/authorize';

	// 	const options = {
	// 		client_id: process.env.REACT_APP_CLIENT_ID,
	// 		redirect_uri: process.env.REACT_APP_REDIRECT_URI,
	// 		scope: 'user:email',
	// 		state: from,
	// 	};

	// 	const qs = new URLSearchParams(options);
	// 	// navigate(`${rootURl}?${qs.toString()}`)

	// 	// return `${rootURl}?${qs.toString()}`;
	// }
	// const loginWithGithub = (e) => {
	// 	console.log('e', e);
	// 	window.location.assign('https://github.com/login/oauth/authorize?client_id=c6f2234c775eade1e332')
	// }

	return (
		<div className="login_form" style={style}>
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
							autoComplete="on"
						/>
						<span className="password_span" onClick={passwordFunc} >
							{passwordEye === 'password' ? <EyeOff /> : <Eye />}
						</span>
					</div>
					<BlueButton
						type="submit"
						title={loading ? <ScaleLoader color={'white'} height={10} /> : "Continue"}
					/>
				</div>
			</form>
			<div className="login_form_wrapper">
				<p className="login_form_wrapper_info">Or continue with</p>

				<div className="login_form_wrapper_socials">
					<a href="facebook.com">
						<img className="login_form_wrapper_socials_icon" src={facebook} alt="social media icon facebook" />
					</a>
					{/* <button>
						<img className="login_form_wrapper_socials_icon" src={github} alt="social media icon github" />
					</button> */}

					{/* <GitHubLogin
						scope="user"
						clientId={`c6f2234c775eade1e332`}
						// clientId={`187f5e840d2aac457b6f`}
						// clientId={`96e75f31486ad01087e4`}
						// redirectUri={`https://localhost:3000`}
						onSuccess={success => console.log('success', success)}
						onFailure={failure => console.log('error', failure)}
					>
					</GitHubLogin> */}


					{/* <a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${'c6f2234c775eade1e332'}`}>
						Login with github
					</a> */}
					{/* <a href="facebook.com">
						<img className="login_form_wrapper_socials_icon" src={google} alt="social media google" />
					</a> */}
					<a href="facebook.com">
						<img className="login_form_wrapper_socials_icon" src={github} alt="social media google" />
					</a>
					<GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
						<GoogleLogin
							onSuccess={credentialResponse => {
								const details = jwt_decode(credentialResponse.credential)
								console.log(details);
								console.log(credentialResponse);
							}}
							type="icon"
							shape="circle"
							onError={() => {
								console.log('Login Failed');
							}}
						/>
					</GoogleOAuthProvider>
				</div>
			</div>
		</div>
	);
};

export default Login;
