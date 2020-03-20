import React, { useState, useEffect, Fragment } from 'react';
import './diagram.css';
import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DagreEngine
} from '@projectstorm/react-diagrams';
import {
  CanvasWidget,
  DeleteItemsAction
} from '@projectstorm/react-canvas-core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import JsonViewer from '../../json-viewer/JsonViewer';

const Diagram = ({ form }) => {
  function getDefaultEngine() {
    const engine = createEngine({ registerDefaultZoomCanvasAction: false });
    let model = new DiagramModel();
    engine.setModel(model);
    return engine;
  }

  const [engine, setEngine] = useState(getDefaultEngine());
  const [reorder, setReorder] = useState();
  const [jsonModel, setJsonModel] = useState();

  const buildEngine = () => {
    //1) setup the diagram engine
    // var engine = createEngine();

    //2) setup the diagram model
    var model = new DiagramModel();

    //3-A) create a default node
    // START NODE
    var nodeStart = new DefaultNodeModel('Start', '#2780e3;');
    let portStart = nodeStart.addOutPort('Out');
    nodeStart.setPosition(10, 10);

    //3-B) create another default node
    // END NODE
    var nodeEnd = new DefaultNodeModel('End', '#ff0039');
    let portEnd = nodeEnd.addInPort('In');
    nodeEnd.setPosition(500, 400);

    // link the ports
    // let link1 = port1.link(port2);
    // link1.getOptions().testName = 'Test';
    // link1.addLabel('Hola Mundo!');

    //4) add the models to the root graph
    // model.addAll(nodeStart, nodeEnd, link1);
    model.addAll(nodeStart);
    model.addAll(nodeEnd);

    let newNode = [];
    let newLink = [];
    let newOutPort = [];
    let newInPort = [];
    let newInLink = [];
    let newOutLink = [];
    let nodeX = 0;
    let nodeY = 0;
    let groupsCopy = Object.assign({}, form.uiSchema['ui:groups'][0]);
    delete groupsCopy['ui:template'];
    const groupsSize = Object.keys(groupsCopy).length;

    // DYNAMIC NODES
    // Came from redux form state
    // Every group form is a node
    //TODO:
    // Improve ALL
    Object.keys(groupsCopy).forEach((element, i) => {
      newNode[i] = new DefaultNodeModel(element, 'yellow');
      nodeX = nodeX + 100;
      nodeY = nodeY + 80;
      newNode[i].setPosition(nodeX, nodeY);
      newInPort[i] = newNode[i].addInPort('In');
      newOutPort[i] = newNode[i].addOutPort('Out');
      model.addAll(newNode[i]);
      if (i === 0) {
        // First Element
        newInLink[i] = portStart.link(newInPort[i]);
        model.addAll(newInLink[i]);
        if (i === groupsSize - 1) {
          // If there are 1 element needs In and Out link
          newOutLink[i] = newOutPort[i].link(portEnd);
          model.addAll(newOutLink[i]);
        }
      } else if (i === groupsSize - 1) {
        // Last Element
        newOutLink[i] = newOutPort[i].link(portEnd);
        model.addAll(newOutLink[i]);

        newInLink[i] = newInPort[i].link(newOutPort[i - 1]);
        model.addAll(newInLink[i]);
      } else if (i > 0) {
        // All other in between Elements
        newInLink[i] = newInPort[i].link(newOutPort[i - 1]);
        model.addAll(newInLink[i]);
      }
    });

    //5) load model into engine
    engine.setModel(model);
    setEngine(engine);
    setJsonModel(JSON.stringify(model.serialize()));
  };

  // const [, updateState] = useState();
  // const forceUpdate = useCallback(()=>updateState({}),[]);

  useEffect(() => {
    console.log('fx');
    buildEngine();
  }, []);

  const onSave = () => {
    // console.log(engine);
    console.log(jsonModel);
    let updateJsonModel = new DiagramModel();
    updateJsonModel.addAll(...jsonModel);
    engine.setModel(updateJsonModel);
    engine.forceUpdate();
    setJsonModel(JSON.stringify(updateJsonModel.serialize()));
    console.log(jsonModel);
  };

  //6) render the diagram!
  return (
    <Fragment>
      <div id='diagram'>
        <div id='diagram-toolkit' className='well'>
          <a href='#' className='btn btn-default btn-sm btn-block btn-item'>
            <FontAwesomeIcon icon={faQuestionCircle} /> Agregar Pregunta
          </a>

          {Object.keys(form.uiSchema['ui:groups'][0]).map((item, index) => (
            <a href='#' className='btn btn-default btn-sm btn-block btn-item'>
              <FontAwesomeIcon icon={faFileAlt} /> {item}
            </a>
          ))}
        </div>
        <CanvasWidget className='canvas well' engine={engine} />
      </div>
      <div className='form-buttons bottom-buttons'>
        <Link to={'/formbuilder'} className='btn btn-default'>
          Volver
        </Link>
        <button type='button' className='btn btn-success' onClick={onSave}>
          Guardar
        </button>
      </div>
      <hr />
      {/* <JsonViewer form={form} />
      <JsonViewer form={jsonModel} /> */}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps)(Diagram);
