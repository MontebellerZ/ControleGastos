import { useState } from "react";
import "./TelaEditarConta.css";
import Axios from "axios";

function TelaEditarConta() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	const [nomeInput, setNomeInput] = useState(usuario.nome);
	const [sobrenomeInput, setSobrenomeInput] = useState(usuario.sobrenome);
	const [emailInput, setEmailInput] = useState(usuario.email);
	const [senhaInput, setSenhaInput] = useState(usuario.senha);

	function tryUpdate() {
		let novoUsuario = {
			id: usuario.id,
			email: emailInput,
			senha: senhaInput,
			nome: nomeInput,
			sobrenome: sobrenomeInput,
		};

		Axios.put(
			`http://${process.env.REACT_APP_IPBACKEND}/usuario/update/${usuario.id}`,
			novoUsuario
		)
			.then(() => {
				sessionStorage.setItem("usuario", JSON.stringify(novoUsuario));
				window.location.reload();
			})
			.catch(() => {
				alert("pelo menos deu erro");
			});
	}

	function voltar() {
		document.getElementById("linkTelaConta").click();
	}

	function atualizarUsuario(event) {
		tryUpdate();
		event.preventDefault();
	}

	return (
		<section id="TelaEditarConta">
			<h1>Edite as informações da sua conta.</h1>
			<form onSubmit={atualizarUsuario}>
				<label htmlFor="TelaEditarContaNome">
					Digite o novo Nome:
					<input
						placeholder="Nome"
						id="TelaEditarContaNome"
						type="text"
						value={nomeInput}
						onChange={(event) => {
							setNomeInput(event.target.value);
						}}
					/>
				</label>
				<label htmlFor="TelaEditarContaSobrenome">
					Digite o novo Sobrenome:
					<input
						placeholder="Sobrenome"
						id="TelaEditarContaSobrenome"
						type="text"
						value={sobrenomeInput}
						onChange={(event) => {
							setSobrenomeInput(event.target.value);
						}}
					/>
				</label>
				<label htmlFor="TelaEditarContaEmail">
					Digite o novo Email:
					<input
						placeholder="Email"
						id="TelaEditarContaEmail"
						type="email"
						value={emailInput}
						onChange={(event) => {
							setEmailInput(event.target.value);
						}}
					/>
				</label>
				<label htmlFor="TelaEditarContaSenha">
					Digite a nova Senha:
					<input
						placeholder="Senha"
						id="TelaEditarContaSenha"
						type="password"
						value={senhaInput}
						onChange={(event) => {
							setSenhaInput(event.target.value);
						}}
					/>
				</label>

				<div id="TelaEditarContaControl">
					<input
						type="button"
						value="Voltar para Minha Conta"
						onClick={voltar}
					/>
					<input type="submit" value="Salvar Alterações" />
				</div>
			</form>
		</section>
	);
}

export default TelaEditarConta;
