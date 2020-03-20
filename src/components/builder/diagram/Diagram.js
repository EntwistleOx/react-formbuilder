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
  //1) setup the diagram engine
  const engine = createEngine({ registerDefaultZoomCanvasAction: false });

  //2) setup the diagram model
  let model = new DiagramModel();

  // START NODE
  //3-A) create a default node
  var nodeStart = new DefaultNodeModel('Start', '#2780e3;');
  let portStart = nodeStart.addOutPort('Out');
  nodeStart.setPosition(10, 10);

  // END NODE
  //3-B) create another default node
  var nodeEnd = new DefaultNodeModel('End', '#ff0039');
  let portEnd = nodeEnd.addInPort('In');
  nodeEnd.setPosition(500, 400);

  //4) add the models to the root graph
  model.addAll(nodeStart);
  model.addAll(nodeEnd);

  let newNode = [];
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
    nodeX = nodeX + 50;
    nodeY = nodeY + 50;
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

  //!------------- SERIALIZING ------------------
  var str = JSON.stringify(model.serialize());

  //!------------- DESERIALIZING ----------------
  let model2 = new DiagramModel();
  model2.deserializeModel(JSON.parse(str), engine);
  engine.setModel(model2);

  const onSave = () => {
    const jsonModel = model2.serialize();
    console.log(jsonModel.layers[0].models);
    console.log(jsonModel.layers[1].models);
  };

  //6) render the diagram!
  return (
    <Fragment>
      <div id='diagram'>
        <div id='diagram-toolkit' className='well'>
          <a href='#!' className='btn btn-default btn-sm btn-block btn-item'>
            <FontAwesomeIcon icon={faQuestionCircle} /> Agregar Pregunta
          </a>

          {Object.keys(groupsCopy).map((item, index) => (
            <a
              href='#!'
              key={index}
              className='btn btn-default btn-sm btn-block btn-item'
            >
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
