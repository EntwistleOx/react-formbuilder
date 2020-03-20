import React, { Fragment } from 'react';
import './diagram.css';
import createEngine, {
  DiagramModel,
  DefaultNodeModel
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { connect } from 'react-redux';
import JsonViewer from '../json-viewer/JsonViewer';

const Diagram = ({ form }) => {
  //1) setup the diagram engine
  var engine = createEngine();

  //2) setup the diagram model
  var model = new DiagramModel();

  //3-A) create a default node
  var nodeStart = new DefaultNodeModel('Start', ' rgb(128, 99, 255)');
  let port1 = nodeStart.addOutPort('Out');
  nodeStart.setPosition(0, 0);

  //3-B) create another default node
  var nodeEnd = new DefaultNodeModel('End', 'rgb(255, 99, 66)');
  let port2 = nodeEnd.addInPort('In');
  nodeEnd.setPosition(400, 100);

  // link the ports
  let link1 = port1.link(port2);
  link1.getOptions().testName = 'Test';
  link1.addLabel('Hello World!');

  //4) add the models to the root graph
  model.addAll(nodeStart, nodeEnd, link1);

  //5) load model into engine
  engine.setModel(model);

  //6) render the diagram!
  return (
    <Fragment>
      <CanvasWidget className='canvas' engine={engine} />
      <JsonViewer form={form} />
      <JsonViewer form={model.serialize()} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps)(Diagram);
