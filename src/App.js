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

// class App extends React.Component {
//     render() {
//         return (
//             <Router>
//                 <Switch>
//                     <Route exact path='/'>
//                         <SigninPage />
//                     </Route>
//                     <Route path='/users'>
//                         <Users />
//                     </Route>
//                     <Route path='/edit'>

//                     </Route>
//                     <Route path='/add'>

//                     </Route>
//                 </Switch>
//             </Router>
//         );
//     }

//     handleEmailChange(e){
//         this.setState({email:e.target.value});
//     }

//     handlePasswordChange(e) {
//         this.setState({password:e.target.value});
//     }

//     signIn(){
//         axios.post('https://reqres.in/api/login', {
//             "email": this.state.email,
//             "password": this.state.password
//         })
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }
// }

function App() {
    useEffect(() => {
        history.listen(() => {
        });
    }, []);
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
                            <Redirect from="*" to="/signin" />
                        </Switch>
                    </Router>
                );
}
export default App