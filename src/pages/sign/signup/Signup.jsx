import { useState } from "react";
import "./Signup.scss";
import apple from "src/assets/images/Sign/apple.svg";
import google from "src/assets/images/Sign/google.svg";
import github from "src/assets/images/Sign/github.svg";
import facebook from "src/assets/images/Sign/facebook.svg";
import { useSelector } from "react-redux";
import { Eye, EyeOff } from 'tabler-icons-react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Input from "src/components/Input";
import BlueButton from "src/components/blue-button";
import { useInput } from "src/hooks";
import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import CheckEmail from "./CheckEmail";
import { API } from "src/services/api";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from 'jwt-decode'

const Signup = () => {
	// const { t } = useTranslation();
	const lang = useSelector(state => state.language.language);

	const [passwordEye, setPasswordEye] = useState('password');
	const [passwordEye2, setPasswordEye2] = useState('password');

	const passwordFunc = () => setPasswordEye(prev => prev === 'password' ? 'text' : 'password')
	const passwordFunc2 = () => setPasswordEye2(prev => prev === 'password' ? 'text' : 'password')
	const [loading, setLoading] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [checkEmail, setCheckEmail] = useState(false);

	const {
		inputChange: emailInputChange,
		inputBlur: emailInputBlur,
		inputTouch: emailInputTouch,
		inputReset: emailInputClear,
		value: email,
		inputIsValid: emailIsValid,
		inputIsError: emailInputIsError,
		isExist: emailIsExist
	} = useInput(email => email.includes('@'))

	const {
		inputChange: passwordInputChange,
		inputBlur: passwordInputBlur,
		inputTouch: passwordInputTouch,
		inputReset: passwordInputClear,
		value: password,
		inputIsValid: passwordIsValid,
		inputIsError: passwordInputIsError
	} = useInput(password => password.trim().length > 5)
	const {
		inputChange: password2InputChange,
		inputBlur: password2InputBlur,
		inputTouch: password2InputTouch,
		inputReset: password2InputClear,
		value: password2,
		inputIsValid: password2IsValid,
		inputIsError: password2InputIsError
	} = useInput(password2 => { if (password2) return password2 === password })

	const handleSubmit = e => {
		e.preventDefault();
		emailInputTouch();
		passwordInputTouch();
		password2InputTouch();

		if (emailIsValid && passwordIsValid && password2IsValid) {
			const newUser = {
				email,
				password,
				confirmPassword: password2
			}
			setUserEmail(email)
			setLoading(true)
			API.registerUser(newUser)
				.then(res => {
					if (res.status === 200) {
						emailInputClear();
						passwordInputClear();
						password2InputClear();
						toast.success('You are successfully registered.', { position: toast.POSITION.TOP_LEFT });
						setCheckEmail(true);
					}
				})
				.catch(err => {
					toast.warning(err.response.data.message, { position: toast.POSITION.TOP_LEFT })
				})
				.finally(() => setLoading(false))
		}
	}
	return (
		<>
			{checkEmail && <CheckEmail email={userEmail} />}
			{
				!checkEmail &&
				<div className="login_form">
					<form onSubmit={handleSubmit}>
						<h3 className="login_form_title">Sign up</h3>
						<p className="login_form_info">
							Do you have an account? <Link to={`/${lang}/login`}><b>Log in</b></Link> now!
						</p>
						<div className="signup-content-wrapper">
							<Input
								type="email"
								placeholder="Email"
								inputIsError={emailInputIsError}
								value={email}
								inputChange={emailInputChange}
								inputBlur={emailInputBlur}
								errorMessage="Invalid email."
								autoComplete='off'
								isExist={emailIsExist}
							/>

							<div style={{ 'position': "relative" }} >
								<Input
									type={passwordEye}
									placeholder="Password"
									inputIsError={passwordInputIsError}
									value={password}
									inputChange={passwordInputChange}
									inputBlur={passwordInputBlur}
									errorMessage="Password must be at least 6 characters."
									autoComplete="off"
								/>
								<span className="password_span" onClick={passwordFunc} >
									{
										passwordEye === 'password' ? <EyeOff /> : <Eye />
									}
								</span>
							</div>

							<div style={{ 'position': "relative" }} >
								<Input
									type={passwordEye2}
									placeholder="Confirm password"
									inputIsError={password2InputIsError}
									value={password2}
									inputChange={password2InputChange}
									inputBlur={password2InputBlur}
									errorMessage="Please check password."
									autoComplete="off"
								/>
								<span className="password_span" onClick={passwordFunc2} >
									{
										passwordEye2 === 'password' ? <EyeOff /> : <Eye />
									}
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
							<a href="/facebook.com">
								<img className="login_form_wrapper_socials_icon" src={facebook} alt="social media icon facebook" />
							</a>
							<a href="/facebook.com">
								<img className="login_form_wrapper_socials_icon" src={github} alt="social media icon github" />
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
			}
		</>
	);
};

export default Signup;
