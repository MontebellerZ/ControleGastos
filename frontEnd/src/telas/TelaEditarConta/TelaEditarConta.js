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
			balanco: usuario.balanco,
			entrada: usuario.entrada,
			saida: usuario.saida,
		};

		Axios.put(
			`http://localhost:3001/usuario/update/${usuario.id}`,
			novoUsuario
		)
			.then(() => {
				sessionStorage.setItem("usuario", JSON.stringify(novoUsuario));
			})
			.catch(() => {
				alert("pelo menos deu erro");
			});
	}

	function voltar() {
		document.getElementById("linkTelaConta").click();
	}

	function atualizarUsuario(event) {
		event.preventDefault();
		tryUpdate();
	}

	return (
		<section id="Editar">
			<form onSubmit={atualizarUsuario}>
				<label htmlFor="EditarNome">
					Digite o novo Nome:
					<input
						placeholder="Nome"
						id="EditarNome"
						type="text"
						value={nomeInput}
						onChange={(event) => {
							setNomeInput(event.target.value);
						}}
					/>
				</label>
				<label htmlFor="EditarSobrenome">
					Digite o novo Sobrenome:
					<input
						placeholder="Sobrenome"
						id="EditarSobrenome"
						type="text"
						value={sobrenomeInput}
						onChange={(event) => {
							setSobrenomeInput(event.target.value);
						}}
					/>
				</label>
				<label htmlFor="EditarEmail">
					Digite o novo Email:
					<input
						placeholder="Email"
						id="EditarEmail"
						type="email"
						value={emailInput}
						onChange={(event) => {
							setEmailInput(event.target.value);
						}}
					/>
				</label>
				<label htmlFor="EditarSenha">
					Digite a nova Senha:
					<input
						placeholder="Senha"
						id="EditarSenha"
						type="password"
						value={senhaInput}
						onChange={(event) => {
							setSenhaInput(event.target.value);
						}}
					/>
				</label>

				<input
					type="button"
					value="Voltar para Minha Conta"
					onClick={voltar}
				/>
				<input type="submit" value="Salvar Alterações" />
			</form>
		</section>
	);
}

export default TelaEditarConta;
