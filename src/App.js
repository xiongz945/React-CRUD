import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute'
import { Users } from './Users'
import { SigninPage } from './SigninPage'
import { AddUser } from './AddUser'
import { history } from './history'

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
    return (
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute path='/users' component={Users}>
                            </PrivateRoute>                            
                            <Route exact path='/signin' component={SigninPage}>
                            </Route>
                            <PrivateRoute exact path='/add' component={AddUser}>
                            </PrivateRoute>
                            <Redirect from="*" to="/signin" />
                        </Switch>
                    </Router>
                );
}
export default App