import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom'
//import App from './components/App';
import Appp from './components/Appp';
import Demo from './components/demo'

ReactDOM.render(
  <div >
    <Router>
      <Switch>
      <Route exact path="/" component={Appp} />
       <Route exact path="/graph" component={Demo}  />
        
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

