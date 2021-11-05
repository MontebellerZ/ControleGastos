import './App.css';

import { Switch, BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import TelaNotFound from './telas/TelaNotFound/TelaNotFound';
import TelaLogin from './telas/TelaLogin/TelaLogin';
import CmpGeral from './components/CmpGeral/CmpGeral';

function App() {
  return (
    <Router>
      <div className="hidden">
        <Link id="linkLogin" to="/login"></Link>
        <Link id="linkGeral" to="/"></Link>
      </div>

      <div className="App">
        <Switch>
          <Route path="/login">
            <TelaLogin/>
          </Route>
          <Route path="/app">
            <CmpGeral/>
          </Route>
          <Route exact path="/">
            <Redirect to="/app"/>
          </Route>
          <Route path="/">
            <TelaNotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
