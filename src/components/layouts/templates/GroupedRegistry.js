import React, { useState, Fragment } from "react";
import { Tabs, Tab, Table, Well, Button } from "react-bootstrap";
import { Droppable } from 'react-beautiful-dnd';


// TODO:
// // disabled next tabs, enabled past tabs

export const GroupTemplates = {
    hideshow: props => (
        <div style={{ background: "grey" }}>
            Hide/show{props.properties.map(p => p.children)}
        </div>
    ),
    grid: props => (
        <Table striped bordered condensed hover>
            <tbody>
                {props.properties.map(p => (
                    <tr>
                        <td>{p.name}</td>
                        {p.children.map(c => (
                            <td>{c}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    ),
    table: props => (
        <Table striped bordered condensed hover>
            <tbody>
                {props.properties.map(p => (
                    <tr>
                        <th>{p.name}</th>
                        <td>{p.children}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    ),
    well: props => props.properties.map(p => {
        return (
            <div className='well light-well' key={p.key} >
                <Droppable
                    key={p.key}
                    droppableId={p.key}
                    type='builder'
                >
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            {p.name}
                            {p.children}

                            {Object.keys(p.children).length === 0 && (
                                <div className="panel panel-default text-center panel-notice panel-bottom">
                                    <div className="panel-body text-muted">
                                        Arrastra los elementos del menu aca
                                    </div>
                                </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
    ),
    tabs: props => {
        return (
            <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
                {props.properties.map((p, idx) => (
                    <Tab eventKey={idx} title={p.name}>
                        {p.children}
                    </Tab>
                ))}
            </Tabs>
        );
    },
    controlledTabs: ControlledTabs
};

function ControlledTabs(props) {
    const [active, setActive] = useState(0);

    let isTabDisabled = true;
    if (active < props.properties.length - 1) {
        isTabDisabled = true;
    }

    // tab error
    // color: #ff0039;
    // border-top: 1px solid #ff0039;
    // border-left: 1px solid #ff0039;
    // border-right: 1px solid #ff0039;

    return (
        <Tabs activeKey={active} onSelect={setActive} id="controlled-tab">
            {props.properties.map((p, idx) => {

                // true if every formdata child is undefined
                const hasEmptyFields = p.children.every(child => child.props.formData !== undefined)
                const hasErrors = p.children.every(child => Object.keys(child.props.errorSchema).length > 0)
                // console.log(hasErrors)
                const notLast = props.properties.length - idx > 1;
                const isLast = !notLast;
                const notFirst = idx >= 1 && props.properties.length > 1;

                return (
                    <Tab key={idx} eventKey={idx} title={p.name} disabled={isTabDisabled} >
                        {p.children}
                        <div className='form-buttons'>
                            {notFirst && (
                                <Button className='btn-primary' onClick={() => setActive(idx - 1)}>Anterior</Button>
                            )}
                            {notLast && (
                                <Fragment><div></div><Button className='btn-primary' onClick={() => setActive(idx + 1)} disabled={!hasEmptyFields}>Siguiente</Button></Fragment>
                            )}
                            {isLast && <Fragment><div></div><Button className='btn-success' type="submit" disabled={!hasEmptyFields}>Validar</Button></Fragment>}
                        </div>
                    </Tab>
                );
            })}
        </Tabs >

        // <Tabs activeKey={active} onSelect={setActive} id="controlled-tab">
        //     {props.properties.map((p, idx) => {

        //         // true if every formdata child is undefined
        //         const hasEmptyFields = p.children.every(child => child.props.formData !== undefined)
        //         const hasErrors = p.children.every(child => Object.keys(child.props.errorSchema).length > 0)
        //         // console.log(hasErrors)
        //         const notLast = props.properties.length - idx > 1;
        //         const isLast = !notLast;
        //         const notFirst = idx >= 1 && props.properties.length > 1;

        //         return (
        //             <Tab key={idx} eventKey={idx} title={p.name} disabled={isTabDisabled} >
        //                 {p.children}
        //                 <div className='form-buttons'>
        //                     {notFirst && (
        //                         <Button className='btn-primary' onClick={() => setActive(idx - 1)}>Anterior</Button>
        //                     )}
        //                     {notLast && (
        //                         <Fragment><div></div><Button className='btn-primary' onClick={() => setActive(idx + 1)} disabled={!hasEmptyFields}>Siguiente</Button></Fragment>
        //                     )}
        //                     {isLast && <Fragment><div></div><Button className='btn-success' type="submit" disabled={!hasEmptyFields}>Validar</Button></Fragment>}
        //                 </div>
        //             </Tab>
        //         );
        //     })}
        // </Tabs >
    )
}
