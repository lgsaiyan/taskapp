import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Tasks from './Tasks'
import About from './About'
import history from '../history'

function App() {
  return (
    <div className="ui container app">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Tasks} />
            <Route path="/about" exact component={About} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
