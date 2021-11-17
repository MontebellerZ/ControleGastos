import "./CmpMenu.css";
import ImgBackgruond from "../../imgs/repeatedDoge.png";

import CmpLogo from "../../imgs/logo192.png";
import { NavLink } from "react-router-dom";

function CmpMenu() {
	let usuario = JSON.parse(sessionStorage.getItem("usuario"));

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
					<NavLink
						to="/inicial"
						className={(ativo) =>
							ativo ? "CmpMenuBtnAtivo" : "CmpMenuBtn"
						}
						// className="CmpMenuBtn"
						// activeClassName="CmpMenuBtnAtivo"
					>
						Início
					</NavLink>
					{/* <NavLink
						to="/detalhes"
						className={(ativo) =>
							ativo ? "CmpMenuBtnAtivo" : "CmpMenuBtn"
						}
						// className="CmpMenuBtn"
						// activeClassName="CmpMenuBtnAtivo"
					>
						Detalhes
					</NavLink> */}
					<NavLink
						to="/inserir"
						className={(ativo) =>
							ativo ? "CmpMenuBtnAtivo" : "CmpMenuBtn"
						}
						// className="CmpMenuBtn"
						// activeClassName="CmpMenuBtnAtivo"
					>
						Inserir
					</NavLink>
				</div>

				<div id="CmpMenuLast">
					<NavLink
						to="/conta"
						className={(ativo) =>
							ativo ? "CmpMenuBtnAtivo" : "CmpMenuBtn"
						}
						// className="CmpMenuBtn"
						// activeClassName="CmpMenuBtnAtivo"
					>
						{usuario.nome}
					</NavLink>
				</div>
			</div>
		</section>
	);
}

export default CmpMenu;
