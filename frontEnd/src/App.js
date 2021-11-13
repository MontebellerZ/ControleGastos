import './App.css';

import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
          <Route path="/notFound">
            <TelaNotFound/>
          </Route>
          <Route path="/">
            <CmpGeral/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
