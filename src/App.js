import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Forms from './components/forms/Forms';
import FormRender from './components/render/FormRender';
import FormBuilder from './components/builder/FormBuilder';
import EditFormElement from './components/builder/EditFormElement';
import TestSchema from './components/TestSchema';

// CSS
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Forms} />
        <Route exact path="/forms" component={Forms} />
        <Switch>
          <Route exact path="/formbuilder" component={FormBuilder} />
          <Route exact path="/formrender" component={FormRender} />
          <Route exact path="/edit-form-element/:id" component={EditFormElement} />
          <Route exact path="/test-schema" component={TestSchema} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
