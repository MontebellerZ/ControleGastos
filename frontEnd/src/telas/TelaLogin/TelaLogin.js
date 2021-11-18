import "./TelaLogin.css"; //css file

import ImgLogo from "../../imgs/logo512.png";
import ImgBackgruond from "../../imgs/repeatedDoge.png";
import { Link, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function click(link) {
	document.getElementById(link).click();
}

function CmpLogin(props) {
	const [loginInput, setLoginInput] = useState("");
	const [senhaInput, setSenhaInput] = useState("");

	function tryLogin() {
		Axios.get(
			`http://localhost:3001/usuario/login/${loginInput}/${senhaInput}`
		)
			.then((res) => {
				if (res.data.length === 1) {
					sessionStorage.setItem(
						"usuario",
						JSON.stringify(res.data[0])
					);
					click("linkGeral");
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
		<form
			onSubmit={(e) => {
				btnSubmit(e);
			}}
		>
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

			<Link to={`${props.url.path}/nova_senha`}>
				Esqueci minha senha!
			</Link>

			<input className="TelaLoginInput" type="submit" value="Entrar" />
			<input
				className="TelaLoginInput"
				type="button"
				value="Registrar-se"
				onClick={() => click("linkRegistrar")}
			/>
		</form>
	);
}

function CmpRegistrar() {
	const [emailInput, setEmailInput] = useState("");
	const [senhaInput, setSenhaInput] = useState("");
	const [nomeInput, setNomeInput] = useState("");
	const [sobrenomeInput, setSobrenomeInput] = useState("");

	function tryRegister() {
		Axios.post("http://localhost:3001/usuario/insert", {
			email: emailInput,
			senha: senhaInput,
			nome: nomeInput,
			sobrenome: sobrenomeInput,
		})
			.then(() => {
				click("linkLogin");
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
		tryRegister();
		event.preventDefault();
	}

	return (
		<form
			onSubmit={(e) => {
				btnSubmit(e);
			}}
		>
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
				onClick={() => click("linkLogin")}
			/>
		</form>
	);
}

function CmpNovaSenha() {
	return (
		<form>
			<h1>Recupere sua senha!</h1>

			<label htmlFor="EmailInput">
				<b>Email da sua conta</b>
				<input id="EmailInput" type="email" />
			</label>

			<input
				className="TelaLoginInput"
				type="submit"
				value="Enviar Email"
				onClick={() => click("linkLogin")}
			/>
			<input
				className="TelaLoginInput"
				type="button"
				value="Voltar ao Login"
				onClick={() => click("linkLogin")}
			/>
		</form>
	);
}

function TelaLogin() {
	let url = useRouteMatch();

	if (sessionStorage.getItem("usuario")) {
		return <Redirect to="/" />;
	} else {
		return (
			<div id="TelaLogin">
				<div className="hidden">
					<Link
						id="linkRegistrar"
						to={`${url.path}/registrar`}
					></Link>
					<Link
						id="linkNovaSenha"
						to={`${url.path}/nova_senha`}
					></Link>
				</div>

				<div
					id="TelaLoginBackgruond"
					style={{ backgroundImage: `url("${ImgBackgruond}")` }}
				></div>

				<div id="TelaLoginLogo">
					<img src={ImgLogo} alt="logo da página" />
				</div>

				<section id="TelaLoginSideForm">
					<Switch>
						<Route path={`${url.url}/registrar`}>
							<CmpRegistrar />
						</Route>
						<Route path={`${url.url}/nova_senha`}>
							<CmpNovaSenha />
						</Route>
						<Route exact path={`${url.url}/`}>
							<CmpLogin url={url} />
						</Route>
						<Route path={`${url.url}/`}>
							<Redirect to={url.path} />
						</Route>
					</Switch>
				</section>
			</div>
		);
	}
}

export default TelaLogin;
