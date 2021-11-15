import { useState } from "react";
import "./TelaInserir.css";
import Axios from "axios";

function TelaInserir() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	const [tipoInput, setTipoInput] = useState("");
	const [diaInput, setDiaInput] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [objetoInput, setObjetoInput] = useState("");
	const [acaoInput, setAcaoInput] = useState("");
	const [valorInput, setValorInput] = useState("");

	function limparCampos() {
		setTipoInput("");
		setDiaInput(new Date().toISOString().slice(0, 10));
		setObjetoInput("");
		setAcaoInput("");
		setValorInput("");
	}

	function tryRegister() {
		Axios.post("http://localhost:3001/gasto/insert", {
			usuario: usuario.id,
			dia: diaInput,
			tipo: tipoInput,
			objeto: objetoInput,
			acao: acaoInput,
			valor: valorInput,
		})
			.then(() => {
				limparCampos();
			})
			.catch((err) => {
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
				<label htmlFor="TelaInserirMotivoInput">
					Motivo da transação:
					<select
						id="TelaInserirMotivoInput"
						required
						value={tipoInput}
						onChange={(event) => {
							setTipoInput(event.target.value);
						}}
					>
						<option hidden value="" label="Motivo" />
						<option value="Salário" label="Salário" />
						<option value="Lazer" label="Lazer" />
						<option value="Ganho" label="Ganho" />
						<option value="Comida" label="Comida" />
						<option value="Necessidade" label="Necessidade" />
						<option value="Doação" label="Doação" />
						<option value="Outros" label="Outros" />
					</select>
				</label>

				<label htmlFor="TelaInserirObjetivoInput">
					Objetivo da transação
					<input
						id="TelaInserirObjetivoInput"
						type="text"
						placeholder="Objetivo"
						required
						value={objetoInput}
						onChange={(event) => {
							setObjetoInput(event.target.value);
						}}
					/>
				</label>

				<label htmlFor="TelaInserirTipoInput">
					Tipo da transação:
					<select
						id="TelaInserirTipoInput"
						required
						value={acaoInput}
						onChange={(event) => {
							setAcaoInput(event.target.value);
						}}
					>
						<option hidden value="" label="Tipo" />
						<option value="Et" label="Entrada" />
						<option value="Db" label="Débito" />
						<option value="Cr" label="Crédito" />
						<option value="Tr" label="Transferência" />
					</select>
				</label>

				<label htmlFor="TelaInserirValorInput">
					Valor da transação:
					<input
						id="TelaInserirValorInput"
						type="number"
						placeholder="Valor"
						required
						value={valorInput}
						onChange={(event) => {
							setValorInput(event.target.value);
						}}
					/>
				</label>

				<label htmlFor="TelaInserirDiaInput">
					Data da transação:
					<input
						id="TelaInserirDiaInput"
						type="date"
						required
						value={diaInput}
						onChange={(event) => {
							setDiaInput(event.target.value);
						}}
					/>
				</label>

				<div id="TelaInserirControlBtns">
					<input type="reset" value="Limpar" onClick={limparCampos} />
					<input type="submit" value="Registrar" />
				</div>
			</form>
		</section>
	);
}

export default TelaInserir;
