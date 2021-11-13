import "./CmpGeral.css";

import { Switch, Route, Redirect } from 'react-router-dom';

import TelaInicial from '../../telas/TelaInicial/TelaInicial';
import TelaDetalhes from '../../telas/TelaDetalhes/TelaDetalhes';
import TelaInserir from '../../telas/TelaInserir/TelaInserir';
import TelaConta from '../../telas/TelaConta/TelaConta';

import CmpMenu from '../CmpMenu/CmpMenu';

function CmpGeral(){
    return (
        <div id="CmpGeral">
            <CmpMenu/>

            <section id="CmpGeralConteudo">
                <Switch>
                    <Route path="/inicial">
                        <TelaInicial/>
                    </Route>
                    <Route path="/detalhado">
                        <TelaDetalhes/>
                    </Route>
                    <Route path="/inserir">
                        <TelaInserir/>
                    </Route>
                    <Route path="/conta">
                        <TelaConta/>
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/inicial"/>
                    </Route>
                    <Route path="/">
                        <Redirect to="/notFound"/>
                    </Route>
                </Switch>
            </section>
        </div>
    );
}

export default CmpGeral;