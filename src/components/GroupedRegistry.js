import React, { useState } from "react";
import { Tabs, Tab, Table, Well, Button } from "react-bootstrap";
import { Droppable } from 'react-beautiful-dnd';

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
            <Well key={p.key}>
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
                                <div className='notice'>
                                    Arrastra los elementos del menu aca
                               </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Well>
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

    let count = -1
    return (
        <Tabs activeKey={active} onSelect={setActive} id="controlled-tab">
            {props.properties.map((p, idx) => {

                // true if all childs are undefined
                const check = p.children.every(child => child === undefined)
                if (!check) count = count + 1 // add 1 to counter

                if (p.children[0] !== undefined) {
                    const notLast = props.properties.length - idx > 1;
                    const isLast = !notLast;
                    const notFirst = idx >= 1 && props.properties.length > 1;
                    return (
                        <Tab key={count} eventKey={count} title={p.name}>
                            {p.children}
                            {/* {notFirst && ( */}
                            <Button onClick={() => setActive(count - 1)}>Back</Button>
                            {/* )}
                            {notLast && ( */}
                            <Button onClick={() => setActive(count)}>Next</Button>
                            {/* )} */}
                            {/* {isLast && <Button type="submit">Submit</Button>} */}
                        </Tab>
                    );
                } else {
                    return
                }


            })}
        </Tabs>
    );
}
