import React, { useState } from "react";
import { Tabs, Tab, Table, Well, Button } from "react-bootstrap";

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
        if (p.children[0] !== undefined) {
            return <Well>
                {p.name}
                {p.children}
            </Well>
        } else {
            return
        }
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
    console.log(props)
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
