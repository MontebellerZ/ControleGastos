import { useNavigate } from "react-router-dom";

function CmpNovaSenha() {
    let navegar = useNavigate();

    function submitEmail(event) {
        event.preventDefault();
        navegar("/login");
    }

    return (
        <form onSubmit={submitEmail}>
            <h1>Recupere sua senha!</h1>

            <label htmlFor="EmailInput">
                <b>Email da sua conta</b>
                <input id="EmailInput" type="email" />
            </label>

            <input
                className="TelaLoginInput"
                type="submit"
                value="Enviar Email"
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

export default CmpNovaSenha;
