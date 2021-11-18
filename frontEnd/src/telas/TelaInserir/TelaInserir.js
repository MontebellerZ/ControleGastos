import { useEffect, useState } from "react";
import "./TelaInserir.css";
import Axios from "axios";
import CmpTabela from "../../components/CmpTabela/CmpTabela";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function TelaInserir() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	const [motivoInput, setMotivoInput] = useState("");
	const [diaInput, setDiaInput] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [objetivoInput, setObjetivoInput] = useState("");
	const [tipoInput, setTipoInput] = useState("");
	const [valorInput, setValorInput] = useState("");

	const [cabecaTabela, setCabecaTabela] = useState([]);
	const [corpoTabela, setCorpoTabela] = useState([[]]);

	function limparCampos() {
		setMotivoInput("");
		setDiaInput(new Date().toISOString().slice(0, 10));
		setObjetivoInput("");
		setTipoInput("");
		setValorInput("");
	}

	function tryDeleteTransacao(transacao, pos) {
		let stringTransacao = `${transacao.motivo}: ${transacao.objetivo} no valor: ${transacao.valor}`;
		let confirmacao = window.confirm(
			`Deseja realmente apagar essa transação?\n\n${stringTransacao}`
		);

		if (confirmacao) {
			Axios.delete(
				`http://localhost:3001/transacao/delete/${transacao.id}`
			)
				.then(() => {
					console.log("Transacao apagada.");
					tryGetTransacoesUsuario();
				})
				.catch(() => {
					alert("algo de errado nao esta certo");
				});
		}
	}

	function tryGetTransacoesUsuario() {
		Axios.get(`http://localhost:3001/transacao/get/${usuario.id}`)
			.then((result) => {
				let dados = result.data;

				let vCabeca = [
					"Dia",
					"Categoria",
					"Motivo",
					"Tipo",
					"Valor",
					"Controles",
				];
				setCabecaTabela(vCabeca);

				let vCorpo = [];
				for (let i = 0; i < dados.length; i++) {
					let linha = [
						dados[i].dia.slice(0, 10),
						dados[i].motivo,
						dados[i].objetivo,
						dados[i].tipo,
						dados[i].valor,
						<div className="TelaInserirTransacaoCtrl">
							<button
								title="Apagar essa transação"
								onClick={() => {
									tryDeleteTransacao(dados[i], i);
								}}
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</button>
							<button
								title="Apagar essa transação"
								onClick={() => {
									tryDeleteTransacao(dados[i], i);
								}}
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</button>
						</div>,
					];
					vCorpo.push(linha);
				}
				setCorpoTabela(vCorpo);
			})
			.catch(() => {
				alert("algo de errado nao esta certo.");
			});
	}

	function tryRegister() {
		let novaTransacao = {
			usuario: usuario.id,
			dia: diaInput,
			motivo: motivoInput,
			objetivo: objetivoInput,
			tipo: tipoInput,
			valor: valorInput,
		};

		Axios.post("http://localhost:3001/transacao/insert", novaTransacao)
			.then(() => {
				limparCampos();
				tryGetTransacoesUsuario();
			})
			.catch((err) => {
				alert("pelo menos deu erro");
			});
	}

	function inserirTransacao(event) {
		tryRegister();
		event.preventDefault();
	}

	useEffect(tryGetTransacoesUsuario, []);

	return (
		<section id="TelaInserir">
			<form
				id="TelaInserirForm"
				onSubmit={inserirTransacao}
				onReset={limparCampos}
			>
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

				<label htmlFor="TelaInserirMotivoInput">
					Categoria da transação:
					<select
						id="TelaInserirMotivoInput"
						required
						value={motivoInput}
						onChange={(event) => {
							setMotivoInput(event.target.value);
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
					Motivo da transação
					<input
						id="TelaInserirObjetivoInput"
						type="text"
						placeholder="Motivo"
						required
						value={objetivoInput}
						onChange={(event) => {
							setObjetivoInput(event.target.value);
						}}
					/>
				</label>

				<label htmlFor="TelaInserirTipoInput">
					Tipo da transação:
					<select
						id="TelaInserirTipoInput"
						required
						value={tipoInput}
						onChange={(event) => {
							setTipoInput(event.target.value);
						}}
					>
						<option hidden value="" label="Tipo" />
						<option value="Entrada" label="Entrada" />
						<option value="Débito" label="Débito" />
						<option value="Crédito" label="Crédito" />
						<option value="Transferência" label="Transferência" />
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

				<div id="TelaInserirControlBtns">
					<input type="reset" value="Limpar" />
					<input type="submit" value="Registrar" />
				</div>
			</form>

			<div id="TelaInserirDados">
				{corpoTabela.length > 0 ? (
					<CmpTabela cabeca={cabecaTabela} corpo={corpoTabela} />
				) : (
					<h1>Nenhuma transação registrada para seu usuário!</h1>
				)}
			</div>
		</section>
	);
}

export default TelaInserir;
