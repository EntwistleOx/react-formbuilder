import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';

// TODO:
// accept only one @
// accept only one email domain
// filter by domain domain, now shows all domains

const EmailAutocomplete = props => {
  const suggestions = [
    '2call.cl',
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com'
  ];

  const [state, setState] = useState({
    // The active selection's index
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: '',
    dropdownOpen: ''
  });

  // To reference outside elements
  const node = useRef();

  // To manage handleClick to close dropdown
  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  // Fired when input value is changed
  const onChange = (e, fromClick) => {
    const input = e;

    if (!fromClick) {
      // Pattern: \S+@.
      // \S ==> any non whitespace character
      // + ==> one or more results must appear
      // @ ==> contains @
      // .* ==> any character 
      let reg = new RegExp(
        input
          .split('')
          .join('\\w*\\s*\\w*')
          .replace(/\S+@.*/, ''),
        'i'
      );
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

      return props.onChange(state.userInput);
    } else {
      setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: true,
        userInput: input,
        dropdownOpen: 'open'
      });
      return props.onChange(input);
    }
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {

    const email = state.userInput + e.currentTarget.innerText;
    onChange(email, true);

    // Update the user input and reset the rest of the state
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: email,
      dropdownOpen: ''
    });
  };

  // Event fired when the user presses a key down
  const onKeyDown = e => {
    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      e.preventDefault()

      const email = state.userInput + state.filteredSuggestions[state.activeSuggestion];
      onChange(email, true);

      setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: email,
        dropdownOpen: ''
      });
    }

    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (state.activeSuggestion === 0) {
        return;
      }

      setState({
        ...state,
        activeSuggestion: state.activeSuggestion - 1
      });
    }

    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (state.activeSuggestion - 1 === state.filteredSuggestions.length) {
        return;
      }

      console.log(state.activeSuggestion + 1)
      setState({
        ...state,
        activeSuggestion: state.activeSuggestion + 1
      });
    }
  };

  // Close Dropdown
  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }

    // Outside field click and setState
    setState({
      ...state,
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: props.value,
      dropdownOpen: ''
    });
  };

  let suggestionsListComponent;

  if (state.showSuggestions && state.userInput) {
    if (state.filteredSuggestions.length) {
      suggestionsListComponent = (
        <Fragment>
          <div className={`dropdown ${state.dropdownOpen}`}>
            <ul className='dropdown-menu' role='menu'>
              {state.filteredSuggestions.map((suggestion, index) => {

                let className;

                // Flag the active suggestion with a class
                if (index === state.activeSuggestion) {
                  className = "active";
                }

                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    <Link to='#!'>{suggestion}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      <div id="email-autocomplete" className='form-group' ref={node}>
        <input
          type='email'
          className='form-control'
          value={state.userInput}
          // value={props.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={e => onChange(e.target.value, false)}
          onKeyDown={onKeyDown}
        // onKeyUp={e => onChange(e.target.value, false)}
        />
        {suggestionsListComponent}
      </div>
    </Fragment>
  );
};

export default EmailAutocomplete;
