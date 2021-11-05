import { Switch, Link, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { useState } from 'react';

import TelaInicial from '../../telas/TelaInicial/TelaInicial';
import TelaDetalhes from '../../telas/TelaDetalhes/TelaDetalhes';
import TelaInserir from '../../telas/TelaInserir/TelaInserir';
import TelaConta from '../../telas/TelaConta/TelaConta';
import TelaNotFound from '../../telas/TelaNotFound/TelaNotFound';

import CmpMenu from '../CmpMenu/CmpMenu';

function CmpGeral(){
    let url = useRouteMatch();

    const [telaAtiva, setTelaAtiva] = useState([
        "CmpMenuBtnAtivo",
        "CmpMenuBtn",
        "CmpMenuBtn",
        "CmpMenuBtn"
    ]);

    return (
        <div className="CmpGeral">
            <div className="hidden">
                <Link onClick={() => setTelaAtiva(1)} id="linkInicial" to={`${url.url}/inicial`}></Link>
                <Link onClick={() => setTelaAtiva(2)} id="linkDetalhado" to={`${url.url}/detalhado`}></Link>
                <Link onClick={() => setTelaAtiva(3)} id="linkInserir" to={`${url.url}/inserir`}></Link>
                <Link onClick={() => setTelaAtiva(4)} id="linkConta" to={`${url.url}/conta`}></Link>
            </div>

            <CmpMenu url={url} ativo={telaAtiva}/>

            <section className="CmpGeralConteudo">
                <Switch>
                    <Route path={`${url.path}/inicial`}>
                        <TelaInicial/>
                    </Route>
                    <Route path={`${url.path}/detalhado`}>
                        <TelaDetalhes/>
                    </Route>
                    <Route path={`${url.path}/inserir`}>
                        <TelaInserir/>
                    </Route>
                    <Route path={`${url.path}/conta`}>
                        <TelaConta/>
                    </Route>
                    <Route exact path={url.path}>
                        <Redirect to={`${url.url}/inicial`}/>
                    </Route>
                    <Route path="/">
                        <TelaNotFound/>
                    </Route>
                </Switch>
            </section>
        </div>
    );
}

export default CmpGeral;