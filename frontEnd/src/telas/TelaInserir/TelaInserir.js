import { useState } from "react";
import "./TelaInserir.css";
import Axios from "axios";

function TelaInserir() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	const [tipoInput, setTipoInput] = useState("");
	const [diaInput, setDiaInput] = useState("");
	const [objetoInput, setObjetoInput] = useState("");
	const [acaoInput, setAcaoInput] = useState("");
	const [valorInput, setValorInput] = useState("");

	function limparCampos(){
		setTipoInput("");
		setDiaInput("");
		setObjetoInput("");
		setAcaoInput("");
		setValorInput("");
	}

	function tryRegister() {
		Axios.post("http://localhost:3001/gasto/insert", {
			conta: usuario.id,
			dia: diaInput,
			tipo: tipoInput,
			objeto: objetoInput,
			acao: acaoInput,
			valor: valorInput,
		}).catch((err) => {
			alert("pelo menos deu erro");
		});
	}

	function inserirTransacao(event) {
		tryRegister();
		event.preventDefault();
	}

	return (
		<section id="TelaInserir">
			<form onSubmit={inserirTransacao}>
				<label htmlFor="TelaTipo">
					Tipo da transação:
					<select
						name="select"
						value={tipoInput}
						onChange={(event) => {
							setTipoInput(event.target.value);
						}}
					>
						<option value="Salário">Salário</option>
						<option value="Lazer">Lazer</option>
						<option value="Ganho">Ganho</option>
						<option value="Comida">Comida</option>
						<option value="Necessidade">Necessidade</option>
						<option value="Doação">Doação</option>
						<option value="Outros">Outros</option>
					</select>
				</label>

				<label htmlFor="TelaInserirOque">
					O dinheiro foi gasto com:
					<input
						id="TelaInserirOque"
						type="string"
						placeholder="Digite o que comprou"
						value={objetoInput}
						onChange={(event) => {
							setObjetoInput(event.target.value);
						}}
					/>
				</label>

				<label htmlFor="TelaAcao">
					Ação:
					<select
						name="select"
						value={acaoInput}
						onChange={(event) => {
							setAcaoInput(event.target.value);
						}}
					>
						<option value="Et">Et</option>
						<option value="Db">Db</option>
						<option value="Cr">Cr</option>
						<option value="Tr">Tr</option>
						<option value="Dp">Dp</option>
					</select>
				</label>

				<label htmlFor="TelaInserirValor">
					Valor da transação:
					<input
						id="TelaInserirValor"
						type="number"
						placeholder="Valor"
						value={valorInput}
						onChange={(event) => {
							setValorInput(event.target.value);
						}}
					/>
				</label>

				<label htmlFor="TelaData">
					Data da transação:
					<input
						id="TelaData"
						type="date"
						value={diaInput}
						onChange={(event) => {
							setDiaInput(event.target.value);
						}}
					/>
				</label>

				<input type="reset" value="Limpar Campos" onClick={limparCampos} />
				<input type="submit" value="Registrar Transação" />
			</form>
		</section>
	);
}

export default TelaInserir;
