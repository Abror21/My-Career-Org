import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";


const ProtectedRoute = ({ children }) => {
    console.log('ProtectedRoute');
    // const test = () => {
    //     // let token = JSON.parse(localStorage.getItem("user-token"));
    //     // return jwt_decode(token.access_token);
    //     console.log(jwt_decode(localStorage.getItem("user-token")));
    // }
    // test();

    const lang = useSelector(state => state.language.language);
    const userToken = localStorage.getItem('user-token');
    if (userToken) {
        const tokenExpiration = jwt_decode(userToken).exp;
        const currentDate = Date.now() / 1000;
        if (currentDate > tokenExpiration) {
            toast.warning("Your TOKEN is expired. Please Log In again.", {
                toastId: 'success1',
            })
            return <Navigate to={`/${lang}/login`} />;
        }
    } else {
        return <Navigate to={`/${lang}/login`} />;
    }

    return children;
}

export default ProtectedRoute;