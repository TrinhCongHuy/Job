import { Navigate, Outlet } from "react-router-dom";
// import { getCookie } from "../../helpers/cookie";

function PrivateRoutes() {
    let isLogin = true;
    // const cookie = getCookie("id");
    // if (cookie) {
    //     isLogin = true;
    // }
    return ( 
        <>
            {isLogin ? (
                <Outlet />
            ) : (
                <Navigate to="/login" />
            )}
        </>
     );
}

export default PrivateRoutes;