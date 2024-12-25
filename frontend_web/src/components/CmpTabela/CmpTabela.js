import "./CmpTabela.css";
import * as XLSX from "xlsx";

function CmpTabela(props) {
    let cabeca = props.cabeca;
    let corpo = props.corpo;

    function downloadTable(tabela_id) {
        let data = document.getElementById(tabela_id);
        // console.log(data);
        let file = XLSX.utils.table_to_book(data, { sheet: "Sua Tabela" });
        XLSX.write(file, { bookType: "xlsx", bookSST: true, type: "base64" });
        XLSX.writeFile(file, "tabela.xlsx");
    }

    return (
        <>
            <table className="CmpTabela" id={props.tableId}>
                <thead>
                    <tr>
                        {cabeca.map((titulo, index) => (
                            <th key={index}>{titulo}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {corpo.map((linha, index) => (
                        <tr key={index}>
                            {linha.map((dado, index) => (
                                <td key={index}>{dado}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="CmpTabelaDownload"
                onClick={() => {
                    downloadTable(props.tableId);
                }}
            >
                Baixar tabela pro Excel
            </button>
        </>
    );
}

export default CmpTabela;
