import React, { useEffect } from 'react'
import {
    Router,
    Switch,
    Redirect,
    Route
  } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute'
import { Users } from './Users'
import { SigninPage } from './SigninPage'
import { AddUser } from './AddUser'
import { history } from './history'
import { UpdateUser } from './UpdateUser';

function App() {

    return (
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute path='/users' component={Users}>
                            </PrivateRoute>                            
                            <Route exact path='/signin' component={SigninPage}>
                            </Route>
                            <PrivateRoute exact path='/add' component={AddUser}>
                            </PrivateRoute>
                            <PrivateRoute path='/edit/:id' component={UpdateUser}>
                            </PrivateRoute>
                            <Redirect from="*" to="/users" />
                        </Switch>
                    </Router>
                );
}
export default App