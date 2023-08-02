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
// import { useTranslation } from "react-i18next";
import FreelanceOrCompany from "./pages/freelancer-or-company/FreelancerOrCompany.jsx";
import FreelancerResume from "./pages/freelancer/freelancer-resume/FreelancerResume";
import ProtectedRoute from "./routes/protected-route/ProtectedRoute";
import CompanyResume from "./pages/company/company-resume/CompanyResume";
import FreelancerResumeFinish from "./pages/freelancer/freelancer-resume/components/freelancer-resume-finish/FreelancerResumeFinish";
import ErrorHandler from "./components/error-handler/ErrorHandler";
import { ErrorBoundary } from "react-error-boundary";
import FreelancerProfile from "./pages/freelancer/freelancer-profile/FreelancerProfile";
import { API } from "./services/api";
import Iframe from 'react-iframe'

function App() {

  const lang = useSelector(state => state.language.language);

  // const { i18n } = useTranslation();

  return (
    <>
      {/* <h1>falskjdflkj</h1>
      <Iframe url={`https://youtu.be/v2u8EDGFVpo`}
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative" /> */}
      {/* <div style={{ position: 'fixed', zIndex: 999 }}>
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
      </div> */}
      <Routes>
        <Route path="/" element={<Navigate to={`/${lang}/home`} />} />
        <Route path={`*`} element={<Navigate to={`/${lang}/home`} />} />
        <Route path={`${lang}/`} element={<Navigate to={`/${lang}/home`} />} />
        <Route path={`${lang}/`} element={<WelcomeBackground />}>
          <Route path="home" element={<ErrorBoundary FallbackComponent={ErrorHandler}><HomeContentSwitcher /></ErrorBoundary>} />
          <Route path="talents" element={<ErrorBoundary FallbackComponent={ErrorHandler}><Talents /></ErrorBoundary>} />
          <Route path="jobs" element={<ErrorBoundary FallbackComponent={ErrorHandler}><Jobs /></ErrorBoundary>} />
          <Route path="about-us" element={<ErrorBoundary FallbackComponent={ErrorHandler}><Aboutus /></ErrorBoundary>} />
          <Route path="contact-us" element={<ErrorBoundary FallbackComponent={ErrorHandler}><Contactus /></ErrorBoundary>} />
        </Route>
        <Route path={`${lang}`} element={<SignBackground />}>
          <Route path="login" element={<ErrorBoundary FallbackComponent={ErrorHandler}><Login /></ErrorBoundary>} />
          <Route path="sign-up" element={<ErrorBoundary FallbackComponent={ErrorHandler}><Signup /></ErrorBoundary>} />
          <Route path="*" element={<Navigate to={`/${lang}/home`} />} />
        </Route>
        <Route path={`${lang}/freelancer-or-company`} element={<ProtectedRoute>{<FreelanceOrCompany />}</ProtectedRoute>} />
        <Route path={`${lang}/freelancer-resume`} element={<ProtectedRoute>{<FreelancerResume />}</ProtectedRoute>} />
        <Route path={`${lang}/freelancer-resume/:resumeId`} element={<ProtectedRoute>{<FreelancerResumeFinish />}</ProtectedRoute>} />
        <Route path={`${lang}/company-resume`} element={<ProtectedRoute>{<CompanyResume />}</ProtectedRoute>} />
        <Route path={`${lang}/freelancer-profile`} element={<ProtectedRoute>{<FreelancerProfile />}</ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
