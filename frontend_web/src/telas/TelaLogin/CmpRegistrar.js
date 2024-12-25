import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CmpRegistrar() {
    const [emailInput, setEmailInput] = useState("");
    const [senhaInput, setSenhaInput] = useState("");
    const [nomeInput, setNomeInput] = useState("");
    const [sobrenomeInput, setSobrenomeInput] = useState("");

    let navegar = useNavigate();

    function tryRegister() {
        Axios.post(`http://${process.env.REACT_APP_IPBACKEND}/usuario/insert`, {
            email: emailInput,
            senha: senhaInput,
            nome: nomeInput,
            sobrenome: sobrenomeInput,
        })
            .then(() => {
                navegar("/login");
            })
            .catch((err) => {
                if (err.status === 599) {
                    alert(
                        `Não foi possível criar a conta pois o email "${emailInput}" já está cadastrado por outro usuário.`
                    );
                }
            });
    }

    function btnSubmit(event) {
        event.preventDefault();

        switch (true) {
            case !(emailInput.length > 0):
                alert("Campo email precisa estar preenchido!");
                break;

            case !senhaInput.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
            ):
                alert(
                    "Campo senha precisa:" +
                        "\n- Conter entre 6 e 20 caracteres;" +
                        "\n- Conter pelo menos uma letra minúscula e uma maiúscula;" +
                        "\n- Conter pelo menos um número;" +
                        "\n- Conter pelo menos um carácter especial;"
                );
                break;

            case !(nomeInput.length > 0):
                alert("Campo nome precisa estar preenchido!");
                break;

            case !(sobrenomeInput.length > 0):
                alert("Campo sobrenome precisa estar preenchido!");
                break;

            default:
                tryRegister();
                break;
        }
    }

    return (
        <form onSubmit={btnSubmit}>
            <h1>Crie sua nova conta!</h1>

            <label htmlFor="EmailInput">
                <b>Insira seu Email</b>
                <input
                    id="EmailInput"
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                        setEmailInput(e.target.value);
                    }}
                />
            </label>
            <label htmlFor="SenhaInput">
                <b>Crie sua Senha</b>
                <input
                    id="SenhaInput"
                    type="password"
                    value={senhaInput}
                    onChange={(e) => {
                        setSenhaInput(e.target.value);
                    }}
                />
            </label>
            <label htmlFor="NomeInput">
                <b>Insira seu nome</b>
                <input
                    id="NomeInput"
                    type="text"
                    value={nomeInput}
                    onChange={(e) => {
                        setNomeInput(e.target.value);
                    }}
                />
            </label>
            <label htmlFor="SobrenomeInput">
                <b>Insira seu sobrenome</b>
                <input
                    id="SobrenomeInput"
                    type="text"
                    value={sobrenomeInput}
                    onChange={(e) => {
                        setSobrenomeInput(e.target.value);
                    }}
                />
            </label>

            <input
                className="TelaLoginInput"
                type="submit"
                value="Criar conta"
            />
            <input
                className="TelaLoginInput"
                type="button"
                value="Voltar ao Login"
                onClick={() => {
                    navegar("/login");
                }}
            />
        </form>
    );
}

export default CmpRegistrar;
