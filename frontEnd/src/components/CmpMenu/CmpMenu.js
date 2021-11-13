import "./CmpMenu.css";
import ImgBackgruond from "../../imgs/repeatedDoge.png";

import CmpLogo from "../../imgs/logo192.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function CmpMenu(props) {
	const [telaAtiva, setTelaAtiva] = useState([
		"CmpMenuBtnAtivo",
		"CmpMenuBtn",
		"CmpMenuBtn",
		"CmpMenuBtn",
	]);

	function click(pos, link) {
		let baseClasses = new Array(4).fill("CmpMenuBtn");
		baseClasses[pos] = "CmpMenuBtnAtivo";

		setTelaAtiva(baseClasses);
		document.getElementById(link).click();
	}

	return (
		<section id="CmpMenu">
			<div className="hidden">
				<Link id="linkTelaInicial" to="/inicial"></Link>
				<Link id="linkTelaDetalhado" to="/detalhado"></Link>
				<Link id="linkTelaInserir" to="/inserir"></Link>
				<Link id="linkTelaConta" to="/conta"></Link>
			</div>
			
			<div id="CmpMenuCabecalho">
				<div
					id="CmpMenuBackground"
					style={{ backgroundImage: `url("${ImgBackgruond}")` }}
				/>
				<img src={CmpLogo} alt="Logo do site" />
			</div>

			<div id="CmpMenuCorpo">
				<div id="CmpMenuFirst">
					<button
						className={telaAtiva[0]}
						type="button"
						onClick={() => click(0, "linkTelaInicial")}
					>
						Início
					</button>
					<button
						className={telaAtiva[1]}
						type="button"
						onClick={() => click(1, "linkTelaDetalhado")}
					>
						Detalhes
					</button>
					<button
						className={telaAtiva[2]}
						type="button"
						onClick={() => click(2, "linkTelaInserir")}
					>
						Registrar
					</button>
				</div>

				<div id="CmpMenuLast">
					<button
						className={telaAtiva[3]}
						type="button"
						onClick={() => click(3, "linkTelaConta")}
					>
						Filipe
					</button>
				</div>
			</div>
		</section>
	);
}

export default CmpMenu;
