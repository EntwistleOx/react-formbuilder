import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Forms from './components/forms/Forms';
import FormRender from './components/render/FormRender';
import FormBuilder from './components/builder/FormBuilder';
import EditFormElement from './components/builder/EditFormElement';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Forms} />
      <Route exact path="/forms" component={Forms} />
      <Switch>
        <Route exact path="/formbuilder" component={FormBuilder} />
        <Route exact path="/formrender" component={FormRender} />
        <Route exact path="/edit-form-element/:id" component={EditFormElement} />
      </Switch>
    </Router>
  );
}

export default App;
