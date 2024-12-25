import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CmpPopup.css";

function CmpPopup(props) {
    return (
        <div id="CmpPopupContainer">
            <h1 id="CmpPopupTitulo">{props.titulo}</h1>
            <div id="CmpPopupBox">{props.box}</div>
            <div id="CmpPopupBottom">
                <p>Fechar Popup</p>
                <button>
                    <FontAwesomeIcon icon={faCancel} />
                </button>
            </div>
        </div>
    );
}

export default CmpPopup;
