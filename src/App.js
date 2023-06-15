import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import WelcomeBackground from './pages/welcome/background/WelcomeBackground'
import HomeContentSwitcher from "./pages/welcome/components/home/HomeContentSwitcher";
import Talents from './pages/welcome/components/talents/Talents';
import Jobs from './pages/welcome/components/jobs/Jobs';
import Aboutus from './pages/welcome/components/about-us/Aboutus';
import Contactus from './pages/welcome/components/contact-us/Contactus';
import Login from "./pages/sign/login/Login";
import Signup from "./pages/sign/signup/Signup";
import SignBackground from "./pages/sign/background/SignBackground";
import { useTranslation } from "react-i18next";
import FreelanceOrCompany from "./pages/freelancer-or-company/FreelancerOrCompany.jsx";
import FreelancerResume from "./pages/freelancer/freelancer-resume/FreelancerResume";
import Round from "./components/Round/Round";

function App() {

  // const auth = useSelector(state => state.login.loggedIn);
  const lang = useSelector(state => state.language.language);
  const { i18n } = useTranslation();
  // const freelancerOrCompony = useSelector(state => state.login.freelancerOrCompony);
  // const loginOnSuccess = useSelector(state => state.login.loginOnSuccess);
  // const contactsIsSuccess = useSelector(state => state.companyRegister.contactsIsSuccess);

  // const { pathname } = useLocation();
  // const freelancer = localStorage.getItem("isResume") ? localStorage.getItem("isResume") : "welcome";

  let freelanceOrCompany;

  // if (auth) {
  //   let decode = jwt_decode(auth);
  //   freelanceOrCompany = Object.values(decode).includes("Company")
  //     ? "Company"
  //     : (freelanceOrCompany = Object.values(decode).includes("Freelancer") ? "Freelancer" : "None");
  // }
  const handleLanguage = (lg) => {
    i18n.changeLanguage(lg);
  };
  return (
    <>
      <div style={{ position: 'fixed', zIndex: 999 }}>
        {
          ["uz", "en", "ru"].map((lg, index) => (
            <button
              style={{ padding: '5px 15px' }}
              key={lg + index}
              onClick={() => handleLanguage(lg)}
            >
              {lg}
            </button>
          ))
        }
      </div>
      <Routes>
        {/* <Route path="/" element={<Navigate to={`/${lang}/home`} />} />
        <Route path={`${lang}`} element={<Navigate to={`/${lang}/home`} />} />
        <Route path={`${lang}/`} element={<Navigate to={`/${lang}/home`} />} /> */}
        <Route path={`${lang}/`} element={<WelcomeBackground />}>
          <Route path="home" element={<HomeContentSwitcher />} />
          <Route path="talents" element={<Talents />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="about-us" element={<Aboutus />} />
          <Route path="contact-us" element={<Contactus />} />
        </Route>
        <Route path={`${lang}`} element={<SignBackground />}>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          {/* <Route path="*" element={<Navigate to={`/${lang}/home`} />} /> */}
        </Route>
        <Route path={`${lang}/freelancer-or-company`} element={<FreelanceOrCompany />} />
        <Route path={`${lang}/freelancer`} element={<FreelancerResume />} />
      </Routes>
    </>
  );
}

export default App;
