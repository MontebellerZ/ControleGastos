import './CmpMenu.css';

import CmpLogo from '../../imgs/logo192.png';

function CmpMenu(props){
    function click(link){
        document.getElementById(link).click();
    }

    return (
        <section id="CmpMenu">
            <div id="CmpMenuNav">
                <img src={CmpLogo} alt="Logo do site"/>

                <button className={props.ativo[0]} type="button" onClick={() => click("linkInicial")}>Início</button>
                <button className={props.ativo[1]} type="button" onClick={() => click("linkDetalhado")}>Detalhes</button>
                <button className={props.ativo[2]} type="button" onClick={() => click("linkInserir")}>Registrar</button>
            </div>

            <div id="CmpMenuConta">
                <button className={props.ativo[3]} type="button" onClick={() => click("linkConta")}>
                    Filipe
                </button>
            </div>
        </section>
    );
}

export default CmpMenu;