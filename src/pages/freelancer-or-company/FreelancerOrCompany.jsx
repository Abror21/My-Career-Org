import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./FreelancerOrCompany.scss";
import login_ellipse from "src/assets/images/Sign/Ellipse-6.png";
import sign_logo from "src/assets/images/Sign/sign_logo.svg";
import left_arrow from "src/assets/images/Sign/left_arrow.svg";
import computer_img from "src/assets/images/Sign/computer.png";
import comp from "src/assets/images/Sign/comp.svg";
import user from "src/assets/images/Sign/frilancer_user.svg";
import telegram_icon from "src/assets/images/Sign/white-telegram.svg";
import instagram_icon from "src/assets/images/Sign/white-instagram.svg";
import facebook_icon from "src/assets/images/Sign/white-facebook.svg";

const FreelanceOrCompany = () => {
  const lang = useSelector(state => state.language.language)
  return (
    <div className="freelancer-or-company">
      <div className="login">
        <div className="login_container">
          <img className="login_bg_img" src={login_ellipse} alt="login background images" />
          <div className="login_container_wrapper">
            <div className="login_company">
              <div className="login_company_wrapper">
                <img src={sign_logo} className="login_container_wrapper_logo" alt="" />
                <button className="login_company_wrapper_back" type="button">
                  <img src={left_arrow} alt="left arrow icon" /> Back
                </button>
              </div>
              <div className="login_company_wrapper1">
                <Link to={`/${lang}/freelancer-resume`}>
                  <div className="login_company_wrapper1_frilanc">
                    <h4 className="login_company_wrapper1_frilanc_title">
                      <img src={user} alt="user icon" /> Freelancer
                    </h4>
                    <p className="login_company_wrapper1_frilanc_info">
                      Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur.
                    </p>
                  </div>
                </Link>
                <Link to={`/${lang}/company-resume`}>
                  <div className="login_company_wrapper1_frilanc">
                    <h4 className="login_company_wrapper1_frilanc_title">
                      <img src={comp} alt="user icon" /> Company
                    </h4>
                    <p className="login_company_wrapper1_frilanc_info">
                      Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur.
                    </p>
                  </div>
                </Link>

                <img src={computer_img} className="computer_img" alt="comp images" />
              </div>

              <div className="login_company_social">
                <a href="www.facebook.com">
                  <img src={telegram_icon} alt="social media icons" />
                </a>
                <a href="www.facebook.com">
                  <img src={facebook_icon} alt="social media icons" />
                </a>
                <a href="www.facebook.com">
                  <img src={instagram_icon} alt="social media icons" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelanceOrCompany;