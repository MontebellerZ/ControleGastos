import './TelaLogin.css'; //css file

import ImgLogo from '../../imgs/logo512.png';
import ImgBackgruond from '../../imgs/repeatedDoge.png';
import { Link, useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

function click(link){
    document.getElementById(link).click();
}

function CmpLogin(props){
    return (
        <form>
            <h1>Logue com sua conta!</h1>
        
            <label htmlFor="EmailInput">
                <b>Email</b>
                <input id="EmailInput" type="email"/>
            </label>
            <label htmlFor="SenhaInput">
                <b>Senha</b>
                <input id="SenhaInput" type="password"/>
            </label>

            <Link to={`${props.url.path}/nova_senha`}>Esqueci minha senha!</Link>

            <input className="TelaLoginInput" type="submit" value="Entrar" onClick={() => click("linkGeral")}/>
            <input className="TelaLoginInput" type="button" value="Registrar-se" onClick={() => click("linkRegistrar")}/>
        </form>
    );
}

function CmpRegistrar(props){
    return (
        <form>
            <h1>Crie sua nova conta!</h1>
            
            <label htmlFor="EmailInput">
                <b>Email</b>
                <input id="EmailInput" type="email"/>
            </label>
            <label htmlFor="SenhaInput">
                <b>Senha</b>
                <input id="SenhaInput" type="password"/>
            </label>
            <label htmlFor="Senha2Input">
                <b>Confirme sua Senha</b>
                <input id="Senha2Input" type="password"/>
            </label>

            <input className="TelaLoginInput" type="submit" value="Criar conta" onClick={() => click("linkGeral")}/>
            <input className="TelaLoginInput" type="button" value="Voltar ao Login" onClick={() => click("linkLogin")}/>
        </form>
    );
}

function CmpNovaSenha(props){
    return (
        <form>
            <h1>Recupere sua senha!</h1>

            <label htmlFor="EmailInput">
                <b>Email da sua conta</b>
                <input id="EmailInput" type="email"/>
            </label>

            <input className="TelaLoginInput" type="submit" value="Enviar Email" onClick={() => click("linkLogin")}/>
            <input className="TelaLoginInput" type="button" value="Voltar ao Login" onClick={() => click("linkLogin")}/>
        </form>
    );
}

function TelaLogin(){
    let url = useRouteMatch();

    return (
        <div id="TelaLogin">
            <div className="hidden">
                <Link id="linkRegistrar" to={`${url.path}/registrar`}></Link>
            </div>

            <div id="TelaLoginBackgruond" style={{backgroundImage: `url("${ImgBackgruond}")`}}></div>

            <div id="TelaLoginLogo">
                <img src={ImgLogo} alt="logo da página"/>
            </div>

            <section id="TelaLoginSideForm">
                <Switch>
                    <Route path={`${url.url}/registrar`}>
                        <CmpRegistrar url={url}/>
                    </Route>
                    <Route path={`${url.url}/nova_senha`}>
                        <CmpNovaSenha url={url}/>
                    </Route>
                    <Route exact path={`${url.url}/`}>
                        <CmpLogin url={url}/>
                    </Route>
                    <Route path={`${url.url}/`}>
                        <Redirect to={`${url.path}`}/>
                    </Route>
                </Switch>
            </section>
        </div>
    );
}

export default TelaLogin;