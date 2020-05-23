import React from 'react'
import axios from 'axios'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';

  class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>User List</h1>
        );
    }
}

export default Users