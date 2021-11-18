import Axios from "axios";
import { useEffect, useState } from "react";
import CmpMeses from "../../components/CmpMeses/CmpMeses";
import "./TelaDetalhes.css";

function TelaDetalhes() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	const [mesesTransacaoGastos, setMesesTransacaoGastos] = useState(0);
	const [mesesTransacaoRecebimentos, setMesesTransacaoRecebimentos] =
		useState(0);

	function tryGetTransacoesUsuario() {
		Axios.get(`http://localhost:3001/transacao/get/${usuario.id}`)
			.then((result) => {
				setMeses(result.data);
			})
			.catch(() => {
				alert("algo de errado nao esta certo.");
			});
	}

	function setMeses(transacoes) {
		let mesesTransacoesGastos = [];
		let mesesTransacoesRecebimentos = [];

		function checkMeses(mesesTransacoes, trns) {
			let sentinela = false;
			let dia = trns.dia.slice(0, 7);

			for (let j = 0; j < mesesTransacoes.length; j++) {
				if (dia === mesesTransacoes[j][0]) {
					sentinela = true;

					mesesTransacoes[j][1].push(trns);

					break;
				}
			}

			if (!sentinela) {
				mesesTransacoes.push([dia, [trns]]);
			}
		}

		for (let i = 0; i < transacoes.length; i++) {
			if (transacoes[i].tipo === "Entrada") {
				checkMeses(mesesTransacoesRecebimentos, transacoes[i]);
			} else {
				checkMeses(mesesTransacoesGastos, transacoes[i]);
			}
		}

		setMesesTransacaoRecebimentos(mesesTransacoesRecebimentos);
		setMesesTransacaoGastos(mesesTransacoesGastos);
	}

	useEffect(tryGetTransacoesUsuario, []);

	return (
		<section id="TelaDetalhes">
			<div id="TelaDetalhesBoxes">
				<div id="TelaDetalhesGastos" className="TelaDetalhesDiv">
					<h1>Gastos</h1>
					<CmpMeses meses={mesesTransacaoGastos} tipo="Saida" />
				</div>
				<div id="TelaDetalhesRecebimentos" className="TelaDetalhesDiv">
					<h1>Recebimentos</h1>
					<CmpMeses
						meses={mesesTransacaoRecebimentos}
						tipo="Entrada"
					/>
				</div>
			</div>
		</section>
	);
}

export default TelaDetalhes;
