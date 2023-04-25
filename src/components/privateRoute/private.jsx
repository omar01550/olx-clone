import { Children } from "react"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, user }) => {
    if (user) {
        return <Navigate to="/" />
    }
    return children
}

export default PrivateRoute;