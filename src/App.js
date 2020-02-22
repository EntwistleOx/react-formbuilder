import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from './components/layouts/Alert';
import Navbar from './components/layouts/Navbar';
import FormBuilder from './components/builder/FormBuilder';
import FormBuilderRender from './components/builder/FormBuilderRender';
import EditFormElement from './components/builder/EditFormElement';
import Forms from './components/forms/Forms';
import FormItemRender from './components/forms/FormItemRender';
import FormEdit from './components/forms/FormEdit';
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
          <Alert />
          <Route exact path='/' component={Forms} />
          <Switch>
            <Route exact path='/formbuilder' component={FormBuilder} />
            <Route
              exact
              path='/formbuilder-render'
              component={FormBuilderRender}
            />
            <Route exact path='/formbuilder/:id' component={EditFormElement} />
            <Route exact path='/forms' component={Forms} />
            <Route exact path='/form-view/:id' component={FormItemRender} />
            <Route exact path='/form-edit/:id' component={FormEdit} />
            <Route exact path='/test-schema' component={TestSchema} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
