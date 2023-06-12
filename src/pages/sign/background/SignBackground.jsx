import { useState, useRef } from "react";
// import "./Login.scss";
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
// import { Eye, EyeOff } from 'tabler-icons-react';
import { Link, Outlet } from "react-router-dom";
import Carusel from "../carousel/Carusel";

const SignBackground = () => {
    const [passwordEye, setPasswordEye] = useState('password');

    const passwordFunc = () => {
        setPasswordEye(passwordEye === 'password' ? 'text' : 'password')
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
        <section className="login">
            <Carusel />
            <div className="login_container">
                <img className="login_bg_img" src={login_ellipse} alt="login background images" />
                <div className="login_container_wrapper">
                    <Link to={`${lang}/welcome/home`}>
                        <img src={sign_logo} className="login_container_wrapper_logo" alt="" />
                    </Link>
                    <Outlet />
                    {/* <Company /> */}
                </div>
            </div>
        </section>
    );
};

export default SignBackground;
