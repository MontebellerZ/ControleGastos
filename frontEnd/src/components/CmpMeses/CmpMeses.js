import { useState } from "react";
import CmpTabela from "../CmpTabela/CmpTabela";
import "./CmpMeses.css";

function CmpMeses(props) {
	const [mes, setMes] = useState(
		// new Date().toLocaleDateString('ko-KR').replace(/\. /g,"-").slice(0, 10)
		new Date()
	);

	function menosMes() {
		let m = mes;
        let novaData = new Date(m.setMonth(m.getMonth() - 1))
		setMes(novaData);
	}
	function maisMes(lado) {
		let m = mes;
        let novaData = new Date(m.setMonth(m.getMonth() + 1))
		setMes(novaData);

        // if()
	}

	return (
		<div>
			<div className="CmpMesesControl">
				<button onClick={menosMes}>esquerda</button>
				<b>
					{mes.toLocaleString("default", {
						month: "long",
						year: "numeric",
					})}
				</b>
				<button onClick={maisMes}>direita</button>
			</div>

            {/* <CmpTabela cabeca={} corpo={}/> */}
		</div>
	);
}

export default CmpMeses;
