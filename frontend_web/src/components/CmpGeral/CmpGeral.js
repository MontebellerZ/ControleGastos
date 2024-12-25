import "./CmpGeral.css";

import { Navigate, Outlet } from "react-router-dom";

import CmpMenu from "../CmpMenu/CmpMenu";

function CmpGeral() {
    let usuario = sessionStorage.getItem("usuario");

    if (!usuario) {
        return <Navigate to="/login" />;
    } else {
        return (
            <div id="CmpGeral">
                <CmpMenu />

                <section id="CmpGeralConteudo">
                    <Outlet />
                </section>
            </div>
        );
    }
}

export default CmpGeral;
