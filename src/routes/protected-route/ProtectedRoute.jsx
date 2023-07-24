import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";


const ProtectedRoute = ({ children }) => {

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