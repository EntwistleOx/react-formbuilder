import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';

const EmailAutocomplete = (props) => {

    console.log(props)

    const suggestions = [
        '2call.cl',
        'gmail.com',
        'hotmail.com',
        'outlook.com',
        'yahoo.com'
    ]

    const [state, setState] = useState({
        // The active selection's index
        activeSuggestion: 0,
        // The suggestions that match the user's input
        filteredSuggestions: [],
        // Whether or not the suggestion list is shown
        showSuggestions: false,
        // What the user has entered
        userInput: props.formData,
        dropdownOpen: ''
    });

    // To reference outside elements
    const node = useRef();

    // To manage handleClick to close dropdown
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const onChange = (e) => {
        const input = e.target.value;

        // // // // Pattern: .*@.*
        let reg = new RegExp(input.split('').join('\\w*\\s*\\w*').replace(/.*@.*/, ""), 'i');
        let filteredSuggestions = suggestions.filter(function (sugestion) {
            if (sugestion.match(reg)) {
                return sugestion;
            }
        });
        setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: input,
            dropdownOpen: 'open'
        });

        // retorna callback
        return props.onChange(state.userInput);
    }

    // Event fired when the user clicks on a suggestion
    const onClick = e => {
        // Update the user input and reset the rest of the state
        setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: state.userInput + e.currentTarget.innerText,
            dropdownOpen: ''
        });
    };

    // Close Dropdown
    const handleClick = e => {

        if (node.current.contains(e.target)) {
            // inside click
            return;
        }

        // outside click and setState
        setState({
            ...state,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: state.userInput,
            dropdownOpen: ''
        });
    }

    let suggestionsListComponent;

    if (state.showSuggestions && state.userInput) {
        if (state.filteredSuggestions.length) {
            suggestionsListComponent = (
                <Fragment>
                    <div className={`dropdown ${state.dropdownOpen}`}>
                        <ul className="dropdown-menu" role="menu">
                            {state.filteredSuggestions.map((suggestion, index) => {
                                return (
                                    <li
                                        key={suggestion}
                                        onClick={onClick}
                                    >
                                        <Link to="#!">
                                            {suggestion}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Fragment>
            );
        }
    };

    return (
        <Fragment>
            <div className="form-group" ref={node}>
                <input
                    type="email"
                    className="form-control"
                    onChange={onChange}
                    value={state.userInput}
                />
                {suggestionsListComponent}
            </div>
        </Fragment>
    )
};

export default EmailAutocomplete;
