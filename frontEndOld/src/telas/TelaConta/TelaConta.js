import "./TelaConta.css";

function TelaConta() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	function voltar() {
		document.getElementById("linkTelaEditarConta").click();
	}

	function deslogar() {
		sessionStorage.removeItem("usuario");
		document.getElementById("linkLogin").click();
	}

	return (
		<section id="TelaConta">
			<h1>Esta é sua conta, {usuario.nome}.</h1>
			<div id="TelaContaInfo">
				<p>
					<b>Nome:</b> {usuario.nome}
				</p>
				<p>
					<b>Sobrenome:</b> {usuario.sobrenome}
				</p>
				<p>
					<b>Email:</b> {usuario.email}
				</p>
				<button id="TelaContaVoltarBtn" onClick={voltar}>
					Editar Informações
				</button>
				<button id="TelaContaSairBtn" onClick={deslogar}>
					Deslogar
				</button>
			</div>
		</section>
	);
}

export default TelaConta;
