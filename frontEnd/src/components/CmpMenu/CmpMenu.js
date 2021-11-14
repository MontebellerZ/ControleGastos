import "./CmpMenu.css";
import ImgBackgruond from "../../imgs/repeatedDoge.png";

import CmpLogo from "../../imgs/logo192.png";

function CmpMenu(props) {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

	let telaAtiva = props.telaAtiva;

	function click(pos, link) {
		let baseClasses = new Array(4).fill("CmpMenuBtn");
		baseClasses[pos] = "CmpMenuBtnAtivo";

		props.setTelaAtiva(baseClasses);
		document.getElementById(link).click();
	}

	return (
		<section id="CmpMenu">			
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
						Inserir
					</button>
				</div>

				<div id="CmpMenuLast">
					<button
						className={telaAtiva[3]}
						type="button"
						onClick={() => click(3, "linkTelaConta")}
					>
						{usuario.nome}
					</button>
				</div>
			</div>
		</section>
	);
}

export default CmpMenu;
