import React, {useState} from 'react'
import axios from 'axios'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';
import Users from './Users'

const initialState = {
    email: '',
    password: ''
};

function reducer(state=initialState, action) {
    console.log('reducer', state, action);
    return state;
}

const store = createStore(reducer);

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);      
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {email: '', password: ''};
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/'>
                        <SigninPage />
                    </Route>
                    <Route path='/users'>
                        <Users />
                    </Route>
                </Switch>
            </Router>
        );
    }

    handleEmailChange(e){
        this.setState({email:e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password:e.target.value});
    }

    signIn(){
        axios.post('https://reqres.in/api/login', {
            "email": this.state.email,
            "password": this.state.password
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

function SigninPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let signIn = () => {
        axios.post('https://reqres.in/api/login', {
            "email": email,
            "password": password
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }


    return <form className="form-signin">
            <h2 className="form-signin-heading"> Please sign in </h2>
            <label htmlFor="inputEmail" className="sr-only"> Email address
            </label>
            <input type="email" id="inputEmail" onChange={(e)=> setEmail(e.target.value)} className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only"> Password</label>
            <input type="password" id="inputPassword" onChange={(e)=> setPassword(e.target.value)} className="form-control" placeholder="Password" required />
            <button className="btn btn-lg btn-primary btn-block" onClick={signIn} type="button"> Sign in
            </button>
        </form>
}

export default Signin