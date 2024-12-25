import "./App.css";

import {
    Routes,
    BrowserRouter as Router,
    Route,
    Navigate,
} from "react-router-dom";

import TelaLogin from "./telas/TelaLogin/TelaLogin";
import CmpLogin from "./telas/TelaLogin/CmpLogin";
import CmpRegistrar from "./telas/TelaLogin/CmpRegistrar";
import CmpNovaSenha from "./telas/TelaLogin/CmpNovaSenha";
import CmpGeral from "./components/CmpGeral/CmpGeral";
import TelaInicial from "./telas/TelaInicial/TelaInicial";
import TelaDetalhes from "./telas/TelaDetalhes/TelaDetalhes";
import TelaInserir from "./telas/TelaInserir/TelaInserir";
import TelaConta from "./telas/TelaConta/TelaConta";
import TelaEditarConta from "./telas/TelaEditarConta/TelaEditarConta";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route element={<TelaLogin />}>
                        <Route path="registrar" element={<CmpRegistrar />} />
                        <Route path="nova_senha" element={<CmpNovaSenha />} />
                        <Route path="login" element={<CmpLogin />} />
                    </Route>
                    <Route element={<CmpGeral />}>
                        <Route path="inicial" element={<TelaInicial />} />
                        <Route path="detalhes" element={<TelaDetalhes />} />
                        <Route path="inserir" element={<TelaInserir />} />
                        <Route path="conta" element={<TelaConta />} />
                        <Route
                            path="conta_editar"
                            element={<TelaEditarConta />}
                        />
                    </Route>
                    <Route path="*" element={<Navigate to="inicial" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
