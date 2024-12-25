import { useEffect, useState } from "react";
import CmpTabela from "../CmpTabela/CmpTabela";
import "./CmpMeses.css";

function CmpMeses(props) {
    const [mes, setMes] = useState(
        // new Date().toLocaleDateString('ko-KR').replace(/\. /g,"-").slice(0, 10)
        new Date()
    );

    function menosMes() {
        let m = mes;
        let novaData = new Date(m.setMonth(m.getMonth() - 1));
        setMes(novaData);
    }
    function maisMes() {
        let m = mes;
        let novaData = new Date(m.setMonth(m.getMonth() + 1));
        setMes(novaData);
    }
    function changeInputMonth(valor) {
        // let correctFormat = `${valor}-01 00:00:00`;
        setMes(new Date(`${valor}-01 00:00:00`));
    }

    let cabeca = ["Dia", "Categoria", "Motivo", "Tipo", "Valor"];
    let corpo = [];
    let total = 0;

    for (let i = 0; i < props.meses.length; i++) {
        if (
            mes.toISOString().slice(0, 7).replace("/", "-") ===
            props.meses[i][0]
        ) {
            for (let j = 0; j < props.meses[i][1].length; j++) {
                let vetorMes = props.meses[i][1][j];

                corpo.push([
                    vetorMes.dia.slice(8, 10),
                    vetorMes.categoria,
                    vetorMes.motivo,
                    vetorMes.tipo,
                    vetorMes.valor.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                    }),
                ]);
                total += vetorMes.valor;
            }
            break;
        }
    }

    useEffect(() => {
        let inputElement = document.getElementById(
            `CmpMesesControlMonth${props.tipo}`
        );
        let inputWidth = inputElement.offsetWidth + 4;
        inputElement.style.width = `${inputWidth}px`;
    }, []);

    return (
        <div className="CmpMeses">
            <div className="CmpMesesControl">
                <button className="CmpMesesControlMove" onClick={menosMes}>
                    Anterior
                </button>
                <input
                    id={`CmpMesesControlMonth${props.tipo}`}
                    type="month"
                    className="CmpMesesControlMonthInput"
                    value={mes.toISOString().slice(0, 7).replace("/", "-")}
                    max={new Date().toISOString().slice(0, 7).replace("/", "-")}
                    onChange={(e) => {
                        changeInputMonth(e.target.value);
                    }}
                />
                <button
                    className="CmpMesesControlMove"
                    onClick={maisMes}
                    disabled={
                        mes.toISOString().slice(0, 7) ===
                        new Date().toISOString().slice(0, 7)
                    }
                >
                    Próximo
                </button>
            </div>
            <h1 title={`Registros: ${corpo.length}`}>
                Total: R$
                {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                })}
            </h1>

            {corpo.length > 0 ? (
                <CmpTabela
                    tableId={`CmpMesesTabelaMonth${props.tipo}`}
                    cabeca={cabeca}
                    corpo={corpo}
                />
            ) : (
                <h1>Não existem transações referentes à esse mês</h1>
            )}
        </div>
    );
}

export default CmpMeses;
