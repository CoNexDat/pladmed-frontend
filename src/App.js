import React, { useContext } from 'react';
import LoginScreen from './screens/login/login_screen'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomeScreen from './screens/home/home_screen'
import OperationsScreen from './screens/operations/operations_screen'
import AccountScreen from './screens/account/account_screen'
import RegisterScreen from './screens/register/register_screen'
import { Context } from './controllers/context_provider'
import Navigation from './components/navigation/navigation'
import Footer from './components/footer/footer'

const ProtectedRoute = ({ component: Component, ...args }) => {
    const { logged } = useContext(Context);

    return (
        <Route
            {...args}
            render={ props =>
                logged ?
                (<Component {...props} />) : (<Redirect to={{pathname: "/login"}} />)
            } 
        />
    )
}

function App() {
    const { logged } = useContext(Context);

    return (
        <React.Fragment>
            <Router>
                <Navigation logged={logged}/>
                    <Switch>
                        <Route exact path="/login" component={LoginScreen} />
                        <Route exact path="/register" component={RegisterScreen} />
                        <ProtectedRoute
                            exact path="/"
                            component={HomeScreen}
                        />
                        <ProtectedRoute
                            exact path="/operations"
                            component={OperationsScreen}
                        />
                        <ProtectedRoute
                            exact path="/users/me"
                            component={AccountScreen}
                        />
                        <ProtectedRoute
                            component={() => "404 not found"}
                        />
                    </Switch>
                <Footer logged={logged}/>
            </Router>
        </React.Fragment>
    )
}

export default App;
