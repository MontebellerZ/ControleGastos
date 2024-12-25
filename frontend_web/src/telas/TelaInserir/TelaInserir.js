import { useEffect, useState } from "react";
import "./TelaInserir.css";
import Axios from "axios";
import CmpTabela from "../../components/CmpTabela/CmpTabela";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function TelaInserir() {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    let dataHoje = new Date();
    let dataString = [
        dataHoje.getFullYear().toString().padStart(4, "0"),
        (dataHoje.getMonth() + 1).toString().padStart(2, "0"),
        dataHoje.getDate().toString().padStart(2, "0"),
    ].join("-");

    const [categoriaInput, setCategoriaInput] = useState("");
    const [diaInput, setDiaInput] = useState(dataString);
    const [motivoInput, setMotivoInput] = useState("");
    const [tipoInput, setTipoInput] = useState("");
    const [valorInput, setValorInput] = useState("");

    const [catSuggest, setCatSuggest] = useState([]);
    const [catSugVisible, setCatSugVisible] = useState(false);
    const [catSugAtivo, setCatSugAtivo] = useState(0);
    const [lengthDrop, setLengthDrop] = useState(0);

    const [cabecaTabela, setCabecaTabela] = useState([]);
    const [corpoTabela, setCorpoTabela] = useState([]);

    function limparCampos() {
        // setDiaInput(new Date().toISOString().slice(0, 10));
        setCategoriaInput("");
        setMotivoInput("");
        setTipoInput("");
        setValorInput("");
    }

    function tryDeleteTransacao(transacao) {
        let stringTransacao = `${transacao.categoria}: ${transacao.motivo} no valor: ${transacao.valor}`;
        let confirmacao = window.confirm(
            `Deseja realmente apagar essa transação?\n\n${stringTransacao}`
        );

        if (confirmacao) {
            Axios.delete(
                `http://${process.env.REACT_APP_IPBACKEND}/transacao/delete/${transacao.id}`
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
        Axios.get(
            `http://${process.env.REACT_APP_IPBACKEND}/transacao/get/${usuario.id}`
        )
            .then((result) => {
                let dados = result.data;

                setCatSuggest(
                    dados
                        .map((dado) => dado.categoria)
                        .filter(
                            (cat, index, array) => array.indexOf(cat) === index
                        )
                );

                setCabecaTabela([
                    "Dia",
                    "Categoria",
                    "Motivo",
                    "Tipo",
                    "Valor (R$)",
                    "Controles",
                ]);

                setCorpoTabela(
                    dados.map((dado) => [
                        dado.dia.slice(0, 10),
                        dado.categoria,
                        dado.motivo,
                        dado.tipo,
                        dado.valor.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        }),
                        <div className="TelaInserirTransacaoCtrl">
                            <button
                                title="Apagar essa transação"
                                onClick={() => {
                                    tryDeleteTransacao(dado);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>,
                    ])
                );
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

        Axios.post(
            `http://${process.env.REACT_APP_IPBACKEND}/transacao/insert`,
            novaTransacao
        )
            .then(() => {
                limparCampos();
                document.getElementById("TelaInserirCategoriaInput").focus();
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

    function selectSugAtivo(event) {
        if (event) event.preventDefault();

        let sug, sugAtivo;
        setCatSugAtivo((catSugAtivo) => {
            sugAtivo = catSugAtivo;
            return 0;
        });
        setCatSuggest((catSuggest) => {
            sug = catSuggest;
            return catSuggest;
        });
        setCategoriaInput(
            (categoriaInput) =>
                sug.filter((s) =>
                    s.toLowerCase().includes(categoriaInput.toLowerCase())
                )[sugAtivo]
        );
    }

    function alterarSugAtivo(event) {
        if (event instanceof KeyboardEvent) {
            let tamanho = 0;
            switch (event.key) {
                case "ArrowDown":
                    setLengthDrop((lengthDrop) => {
                        tamanho = lengthDrop;
                        return lengthDrop;
                    });
                    setCatSugAtivo((catSugAtivo) => {
                        return catSugAtivo < tamanho - 1
                            ? catSugAtivo + 1
                            : catSugAtivo;
                    });
                    event.preventDefault();
                    break;
                case "ArrowUp":
                    setCatSugAtivo((catSugAtivo) =>
                        catSugAtivo > 0 ? catSugAtivo - 1 : catSugAtivo
                    );
                    event.preventDefault();
                    break;
                case "Enter":
                    selectSugAtivo(event);
                    break;
                case "Tab":
                    setLengthDrop((lengthDrop) => {
                        tamanho = lengthDrop;
                        return lengthDrop;
                    });
                    if (tamanho > 0) {
                        selectSugAtivo();
                    }
                    break;
                default:
                    // console.log(event.key);
                    break;
            }
        } else if (event.nativeEvent instanceof MouseEvent) {
            let catSugOver = event.target.innerText;
            let index = catSuggest.indexOf(catSugOver);
            if (index >= 0) setCatSugAtivo(index);
        }
    }

    useEffect(tryGetTransacoesUsuario, []);

    useEffect(() => {
        setLengthDrop(
            catSuggest.filter((cat) =>
                cat.toLowerCase().includes(categoriaInput.toLowerCase())
            ).length
        );
    }, [categoriaInput]);

    useEffect(() => {
        document
            .getElementById("TelaInserirCategoriaInput")
            .addEventListener("keydown", alterarSugAtivo);
    }, []);

    return (
        <section id="TelaInserir">
            <form
                id="TelaInserirForm"
                onSubmit={inserirTransacao}
                onReset={limparCampos}
                autoComplete="off"
            >
                <label htmlFor="TelaInserirDiaInput">
                    Data da transação:
                    <input
                        id="TelaInserirDiaInput"
                        type="date"
                        required
                        max={dataString}
                        value={diaInput}
                        onChange={(event) => {
                            setDiaInput(event.target.value);
                        }}
                    />
                </label>

                <label
                    htmlFor="TelaInserirCategoriaInput"
                    onFocus={() => {
                        setCatSugVisible(true);
                    }}
                    onBlur={() => {
                        setCatSugVisible(false);
                    }}
                >
                    Categoria da transação:
                    <input
                        type="text"
                        id="TelaInserirCategoriaInput"
                        required
                        placeholder="Categoria"
                        value={categoriaInput}
                        onChange={(event) => {
                            setCategoriaInput(event.target.value);
                        }}
                    />
                    <div disabled id="TelaInserirCategoriaSuggest">
                        <ul
                            id="TelaInserirCategoriaInputSuggest"
                            style={
                                catSugVisible && categoriaInput.length > 0
                                    ? {}
                                    : { display: "none" }
                            }
                        >
                            {catSuggest
                                .filter((cat) =>
                                    cat
                                        .toLowerCase()
                                        .includes(categoriaInput.toLowerCase())
                                )
                                .sort((a, b) => {
                                    //- = a // + = b
                                    let aPos = a
                                        .toLowerCase()
                                        .indexOf(categoriaInput.toLowerCase());

                                    let bPos = b
                                        .toLowerCase()
                                        .indexOf(categoriaInput.toLowerCase());

                                    if (
                                        (aPos === 0 && bPos === 0) ||
                                        (aPos !== 0 && bPos !== 0)
                                    ) {
                                        return a < b ? -1 : a > b ? 1 : 0;
                                    } else {
                                        return aPos - bPos;
                                    }
                                })
                                .map((cat, index) => (
                                    <li
                                        key={index}
                                        className={
                                            catSugAtivo === index
                                                ? "catSugOpt catSugAtivo"
                                                : "catSugOpt"
                                        }
                                        onMouseDown={selectSugAtivo}
                                        onMouseOver={alterarSugAtivo}
                                    >
                                        {cat}
                                    </li>
                                ))}
                        </ul>
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
                    <select
                        required
                        value={tipoInput}
                        onChange={(event) => {
                            setTipoInput(event.target.value);
                        }}
                    >
                        <option hidden value="" label="Tipo" />
                        <option value="Entrada" label="Entrada" />
                        <option value="Credito" label="Crédito" />
                        <option value="Debito" label="Débito" />
                    </select>
                </label>

                <label htmlFor="TelaInserirValorInput">
                    Valor da transação:
                    <input
                        id="TelaInserirValorInput"
                        type="number"
                        placeholder="Valor"
                        required
                        step={0.01}
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
                    <CmpTabela
                        cabeca={cabecaTabela}
                        corpo={corpoTabela}
                        tableId="TelaInserirTabela"
                    />
                ) : (
                    <h1>Nenhuma transação registrada para seu usuário!</h1>
                )}
            </div>
        </section>
    );
}

export default TelaInserir;
