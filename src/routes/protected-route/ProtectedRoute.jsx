import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const lang = useSelector(state => state.language.language);
    const userToken = localStorage.getItem('user-token');

    if (!userToken) {
        return <Navigate to={`/${lang}/login`} />;
    }
    return children;
}

export default ProtectedRoute;