import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import PageBackground from './pages/non-auth/Background'
import HomeContentSwitcher from "./pages/non-auth/HomeContentSwitcher";
import Talents from './pages/non-auth/pages/talents/Talents';
import Jobs from './pages/non-auth/pages/jobs/Jobs';
import Aboutus from './pages/non-auth/pages/about-us/Aboutus';
import Contactus from './pages/non-auth/pages/contact-us/Contactus';


function App() {

  // const auth = useSelector(state => state.login.loggedIn);
  const lang = useSelector(state => state.language.language);

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

  return (
    <div>
      <Routes>
        <Route path={`${lang}/`} element={<PageBackground />}>
          <Route path="home" element={<HomeContentSwitcher />} />
          <Route path="talents" element={<Talents />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="about-us" element={<Aboutus />} />
          <Route path="contact-us" element={<Contactus />} />
        </Route>
        {/* <Route path={`${lang}/login`} element={<Login />} />
        <Route path={`${lang}/sign-up`} element={<Signup />} />*/}
        <Route path="*" element={<Navigate to={`/${lang}/home`} />} />
      </Routes>
    </div>
  );
}

export default App;
