import "./TelaLogin.css"; //css file

import ImgLogo from "../../imgs/logo512.png";
import ImgBackgruond from "../../imgs/repeatedDoge.png";
import { Navigate, Outlet } from "react-router-dom";

function TelaLogin() {
    if (sessionStorage.getItem("usuario")) {
        return <Navigate to="app" />;
    } else {
        return (
            <div id="TelaLogin">
                <div
                    id="TelaLoginBackgruond"
                    style={{ backgroundImage: `url("${ImgBackgruond}")` }}
                ></div>

                <div id="TelaLoginLogo">
                    <img src={ImgLogo} alt="logo da página" />
                </div>

                <section id="TelaLoginSideForm">
                    <Outlet />
                </section>
            </div>
        );
    }
}

export default TelaLogin;
