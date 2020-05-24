import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userActions } from './user.actions'

function SigninPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    function signIn(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            dispatch(userActions.login(email, password));
            // history.push('/users');
        }
        // axios.post('https://reqres.in/api/login', {
        //     "email": email,
        //     "password": password
        // })
        // .then((res) => {
        //     console.log(res);
        //     history.push('/users')
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
    }
    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout());
    }, []);

    // return <form className="form-signin" onSubmit={signIn}>
    //         <h2 className="form-signin-heading"> Please sign in </h2>
    //         <label htmlFor="inputEmail" className="sr-only"> Email address
    //         </label>
    //         <input type="email" id="inputEmail" onChange={(e)=> setEmail(e.target.value)} className="form-control" placeholder="Email address" required autoFocus />
    //         <label htmlFor="inputPassword" className="sr-only"> Password</label>
    //         <input type="password" id="inputPassword" onChange={(e)=> setPassword(e.target.value)} className="form-control" placeholder="Password" required />
    //         <button className="btn btn-lg btn-primary btn-block" type="button"> 
    //         {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
    //         Sign in
    //         </button>
    //     </form>
    return <div className="col-lg-8 offset-lg-2">
                <h2>Please sign in first</h2>
                <form name="form" onSubmit={signIn}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                        {submitted && !email &&
                            <div className="invalid-feedback">Email is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                        {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
}

export { SigninPage }


