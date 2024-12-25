import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CmpLogin(props) {
    const [loginInput, setLoginInput] = useState("");
    const [senhaInput, setSenhaInput] = useState("");

    let navegar = useNavigate();

    function tryLogin() {
        Axios.get(
            `http://${process.env.REACT_APP_IPBACKEND}/usuario/login/${loginInput}/${senhaInput}`
        )
            .then((res) => {
                if (res.data.length === 1) {
                    sessionStorage.setItem(
                        "usuario",
                        JSON.stringify(res.data[0])
                    );
                    navegar("/linkRegistrar");
                } else {
                    alert("Usuário ou senha inválidos");
                }
            })
            .catch(() => {
                alert("pelo menos deu erro");
            });
    }

    function btnSubmit(event) {
        tryLogin();
        event.preventDefault();
    }

    return (
        <form onSubmit={btnSubmit}>
            <h1>Logue com sua conta!</h1>

            <label htmlFor="EmailInput">
                <b>Email</b>
                <input
                    id="EmailInput"
                    type="email"
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                />
            </label>
            <label htmlFor="SenhaInput">
                <b>Senha</b>
                <input
                    id="SenhaInput"
                    type="password"
                    required
                    value={senhaInput}
                    onChange={(e) => setSenhaInput(e.target.value)}
                />
            </label>

            <Link to="/nova_senha">Esqueci minha senha!</Link>

            <input className="TelaLoginInput" type="submit" value="Entrar" />
            <input
                className="TelaLoginInput"
                type="button"
                value="Registrar-se"
                onClick={() => {
                    navegar("/registrar");
                }}
            />
        </form>
    );
}

export default CmpLogin;
