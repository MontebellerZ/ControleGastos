import { useEffect, useState } from "react";
import "./TelaInserir.css";
import Axios from "axios";
import CmpTabela from "../../components/CmpTabela/CmpTabela";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";

function TelaInserir() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	const [categoriaInput, setCategoriaInput] = useState("");
	const [diaInput, setDiaInput] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [motivoInput, setMotivoInput] = useState("");
	const [tipoInput, setTipoInput] = useState("");
	const [valorInput, setValorInput] = useState("");

	const [cabecaTabela, setCabecaTabela] = useState([]);
	const [corpoTabela, setCorpoTabela] = useState([[]]);

	function limparCampos() {
		setCategoriaInput("");
		setDiaInput(new Date().toISOString().slice(0, 10));
		setMotivoInput("");
		setTipoInput("");
		setValorInput("");
	}

	function tryDeleteTransacao(transacao, pos) {
		let stringTransacao = `${transacao.categoria}: ${transacao.motivo} no valor: ${transacao.valor}`;
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
						dados[i].categoria,
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
			categoria: categoriaInput,
			motivo: motivoInput,
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

	function editarCategoria(event) {
		event.preventDefault();
	}

	function editarTipo(event) {
		event.preventDefault();
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

				<label htmlFor="TelaInserirCategoriaInput">
					Categoria da transação:
					<div className="TelaInserirDivEdit">
						<select
							id="TelaInserirCategoriaInput"
							required
							value={categoriaInput}
							onChange={(event) => {
								setCategoriaInput(event.target.value);
							}}
						>
							<option hidden value="" label="Categoria" />
							<option value="Salário" label="Salário" />
							<option value="Lazer" label="Lazer" />
							<option value="Ganho" label="Ganho" />
							<option value="Comida" label="Comida" />
							<option value="Necessidade" label="Necessidade" />
							<option value="Doação" label="Doação" />
							<option value="Outros" label="Outros" />
						</select>
						<button
							className="TelaInserirEditInput"
							onClick={editarCategoria}
						>
							<FontAwesomeIcon icon={faPen} />
						</button>
					</div>
				</label>

				<label htmlFor="TelaInserirMotivoInput">
					Motivo da transação
					<input
						id="TelaInserirMotivoInput"
						type="text"
						placeholder="Motivo"
						required
						value={motivoInput}
						onChange={(event) => {
							setMotivoInput(event.target.value);
						}}
					/>
				</label>

				<label htmlFor="TelaInserirTipoInput">
					Tipo da transação:
					<div className="TelaInserirDivEdit">
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
							<option
								value="Transferência"
								label="Transferência"
							/>
						</select>
						<button
							className="TelaInserirEditInput"
							onClick={editarTipo}
						>
							<FontAwesomeIcon icon={faPen} />
						</button>
					</div>
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
