import "./TelaConta.css";

function TelaConta() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	function voltar() {
		document.getElementById("linkTelaEditarConta").click();
	}

	function deslogar(){
		sessionStorage.removeItem("usuario");
		document.getElementById("linkLogin").click();
	}

	return (
		<section id="TelaInserir">
			<p>Nome: {usuario.nome}</p>
			<p>Sobrenome: {usuario.sobrenome}</p>
			<p>Email: {usuario.email}</p>

			<button onClick={voltar}>Editar Informações</button>
			<button onClick={deslogar}>Deslogar</button>
		</section>
	);
}

export default TelaConta;
