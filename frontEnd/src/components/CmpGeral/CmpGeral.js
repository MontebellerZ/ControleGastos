import "./CmpGeral.css";

import { Switch, Route, Redirect, Link } from "react-router-dom";

import TelaInicial from "../../telas/TelaInicial/TelaInicial";
import TelaDetalhes from "../../telas/TelaDetalhes/TelaDetalhes";
import TelaInserir from "../../telas/TelaInserir/TelaInserir";
import TelaConta from "../../telas/TelaConta/TelaConta";
import TelaEditarConta from "../../telas/TelaEditarConta/TelaEditarConta";

import CmpMenu from "../CmpMenu/CmpMenu";
import { useState } from "react";

function CmpGeral(props) {
	let usuario = sessionStorage.getItem("usuario");

	const [telaAtiva, setTelaAtiva] = useState([
		"CmpMenuBtnAtivo",
		"CmpMenuBtn",
		"CmpMenuBtn",
		"CmpMenuBtn",
	]);

	if (!usuario) {
		return <Redirect to="/login" />;
	} 
	else {
		return (
			<div id="CmpGeral">
				<div className="hidden">
					<Link id="linkTelaInicial" to="/inicial"></Link>
					<Link id="linkTelaDetalhado" to="/detalhes"></Link>
					<Link id="linkTelaInserir" to="/inserir"></Link>
					<Link id="linkTelaConta" to="/conta"></Link>
					<Link id="linkTelaEditarConta" to="/editarconta"></Link>
				</div>

				<CmpMenu telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} />

				<section id="CmpGeralConteudo">
					<Switch>
						<Route path="/inicial">
							<TelaInicial />
						</Route>
						<Route path="/detalhes">
							<TelaDetalhes />
						</Route>
						<Route path="/inserir">
							<TelaInserir />
						</Route>
						<Route path="/conta">
							<TelaConta />
						</Route>
						<Route path="/editarconta">
							<TelaEditarConta />
						</Route>
						<Route exact path="/">
							<Redirect to="/inicial" />
						</Route>
						<Route path="/">
							<Redirect to="/notFound" />
						</Route>
					</Switch>
				</section>
			</div>
		);
	}
}

export default CmpGeral;
