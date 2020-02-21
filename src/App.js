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
        <div className='container'>
          <Route exact path="/" component={Forms} />
          <Switch>
            <Route exact path="/formbuilder" component={FormBuilder} />
            <Route exact path="/formbuilder/:id" component={EditFormElement} />
            <Route exact path="/formrender" component={FormRender} />
            <Route exact path="/forms" component={Forms} />
            <Route exact path="/form-view/:id" component={FormRender} />
            <Route exact path="/form-edit/:id" component={FormBuilder} />
            <Route exact path="/test-schema" component={TestSchema} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
