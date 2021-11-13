import './TelaLogin.css'; //css file

import ImgLogo from '../../imgs/logo512.png';
import ImgBackgruond from '../../imgs/repeatedDoge.png';
import { Link, useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

function click(link){
    document.getElementById(link).click();
}

function tryLogin(loginInput, senhaInput){
    console.log(loginInput, senhaInput);
    click("linkGeral");
}

function tryRegister(email, senha, nome, sobrenome){
    Axios.post(
        "http://localhost:3001/api/insert", 
        {
            email: email, 
            senha: senha, 
            nome: nome, 
            sobrenome: sobrenome
        }
    )
    .then(() => {
        click("linkGeral");
    })
    .catch((err) => {
        alert("pelo menos deu erro");
    });
}

function CmpLogin(props){
    const [loginInput, setLoginInput] = useState("");
    const [senhaInput, setSenhaInput] = useState("");

    function btnSubmit(event){
        event.preventDefault();
        tryLogin(loginInput, senhaInput);
    }

    return (
        <form onSubmit={(e) => {btnSubmit(e)}}>
            <h1>Logue com sua conta!</h1>
        
            <label htmlFor="EmailInput">
                <b>Email</b>
                <input id="EmailInput" type="email" value={loginInput} onChange={(e) => setLoginInput(e.target.value)}/>
            </label>
            <label htmlFor="SenhaInput">
                <b>Senha</b>
                <input id="SenhaInput" type="password" value={senhaInput} onChange={(e) => setSenhaInput(e.target.value)}/>
            </label>

            <Link to={`${props.url.path}/nova_senha`}>Esqueci minha senha!</Link>

            <input className="TelaLoginInput" type="submit" value="Entrar"/>
            <input className="TelaLoginInput" type="button" value="Registrar-se" onClick={() => click("linkRegistrar")}/>
        </form>
    );
}

function CmpRegistrar(props){
    const [emailInput, setEmailInput] = useState("");
    const [senhaInput, setSenhaInput] = useState("");
    const [nomeInput, setNomeInput] = useState("");
    const [sobrenomeInput, setSobrenomeInput] = useState("");

    function btnSubmit(event){
        tryRegister(emailInput, senhaInput, nomeInput, sobrenomeInput);
        event.preventDefault();
    }

    return (
        <form onSubmit={(e) => {btnSubmit(e)}}>
            <h1>Crie sua nova conta!</h1>
            
            <label htmlFor="EmailInput">
                <b>Insira seu Email</b>
                <input id="EmailInput" type="email" value={emailInput} onChange={(e) => {setEmailInput(e.target.value)}}/>
            </label>
            <label htmlFor="SenhaInput">
                <b>Crie sua Senha</b>
                <input id="SenhaInput" type="password" value={senhaInput} onChange={(e) => {setSenhaInput(e.target.value)}}/>
            </label>
            <label htmlFor="NomeInput">
                <b>Insira seu nome</b>
                <input id="NomeInput" type="text" value={nomeInput} onChange={(e) => {setNomeInput(e.target.value)}}/>
            </label>
            <label htmlFor="SobrenomeInput">
                <b>Insira seu sobrenome</b>
                <input id="SobrenomeInput" type="text" value={sobrenomeInput} onChange={(e) => {setSobrenomeInput(e.target.value)}}/>
            </label>

            <input className="TelaLoginInput" type="submit" value="Criar conta"/>
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