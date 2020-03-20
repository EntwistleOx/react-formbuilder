import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from './components/layouts/Alert';
import Navbar from './components/layouts/Navbar';
import FormBuilder from './components/builder/FormBuilder';
import FormBuilderRender from './components/builder/FormBuilderRender';
import FormBuilderDiagram from './components/builder/diagram/Diagram';
import EditFormElement from './components/builder/EditFormElement';
import Forms from './components/forms/Forms';
import FormItemRender from './components/forms/FormItemRender';
import FormEdit from './components/forms/FormEdit';
import BuilderTestSchema from './components/test-components/BuilderTestSchema';
import RenderTestSchema from './components/test-components/RenderTestSchema';
import FlowChart from './components/test-components/FlowChart';
import ReactDiagrams from './components/test-components/ReactDiagrams';

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
              path='/formbuilder/:context/:id'
              component={EditFormElement}
            />
            <Route
              exact
              path='/formbuilder-diagram'
              component={FormBuilderDiagram}
            />
            <Route
              exact
              path='/formbuilder-render'
              component={FormBuilderRender}
            />
            <Route exact path='/forms' component={Forms} />
            <Route exact path='/form-view/:id' component={FormItemRender} />
            <Route exact path='/form-edit/:id' component={FormEdit} />
            <Route
              exact
              path='/builder-test-schema'
              component={BuilderTestSchema}
            />
            <Route
              exact
              path='/render-test-schema'
              component={RenderTestSchema}
            />
            <Route exact path='/flow-chart' component={FlowChart} />
            <Route exact path='/react-diagrams' component={ReactDiagrams} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
