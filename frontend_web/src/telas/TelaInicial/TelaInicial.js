import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./TelaInicial.css";

function TelaInicial() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));
	let dia = new Date().getHours();

	const [hora, setHora] = useState(new Date().toLocaleTimeString());
	const [gastos, setGastos] = useState(0);
	const [recebimentos, setRecebimentos] = useState(0);
	const [saldo, setSaldo] = useState(0);
	const [mes] = useState(
		new Date().toLocaleString("default", { month: "long" })
	);

	function tryGetTransacoesUsuario() {
		Axios.get(`http://localhost:3001/transacao/get/${usuario.id}`)
			.then((result) => {
				setDinheiro(result.data);
			})
			.catch(() => {
				alert("algo de errado nao esta certo.");
			});
	}

	function setDinheiro(transacoes) {
		let g = 0;
		let r = 0;
		let s = 0;
		for (let i = 0; i < transacoes.length; i++) {
			if (
				new Date(transacoes[i].dia).getMonth() === new Date().getMonth()
			) {
				if (transacoes[i].tipo === "Entrada") {
					r += transacoes[i].valor;
					s += transacoes[i].valor;
				} else {
					g += transacoes[i].valor;
					s -= transacoes[i].valor;
				}
			}
		}
		setGastos(g);
		setRecebimentos(r);
		setSaldo(s);
	}

	useEffect(tryGetTransacoesUsuario, []);

	setInterval(() => {
		setHora(new Date().toLocaleTimeString());
	}, 1000);

	return (
		<section id="TelaInicial">
			<div id="TelaInicialTitle">
				<h1 id="TelaInicialSaudacao">
					{dia >= 4 && dia < 12
						? "Bom dia"
						: dia >= 12 && dia < 18
						? "Boa tarde"
						: "Boa noite"}
					, {usuario.nome}
				</h1>

				<h1>{hora}</h1>
			</div>

			<h1 id="TelaInicialMes">{mes[0].toUpperCase() + mes.slice(1)}</h1>
			<div id="TelaInicialInfo">
				<div className="TelaInicialInfoQuadrado">
					Seus recebimentos esse mês: R$
					{recebimentos.toLocaleString(undefined, {
						minimumFractionDigits: 2,
					})}
				</div>
				<div className="TelaInicialInfoQuadrado">
					Seus gastos esse mês: R$
					{gastos.toLocaleString(undefined, {
						minimumFractionDigits: 2,
					})}
				</div>
				<div className="TelaInicialInfoQuadrado">
					Saldo do mês: R$
					{saldo.toLocaleString(undefined, {
						minimumFractionDigits: 2,
					})}
				</div>
			</div>
		</section>
	);
}

export default TelaInicial;
