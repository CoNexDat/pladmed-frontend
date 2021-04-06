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

const AuthRoute = ({ component: Component, ...args }) => {
    const { logged } = useContext(Context);

    return (
        <Route
            {...args}
            render={ props =>
                logged() ?
                (<Component {...props} />) : (<Redirect to={{pathname: "/login"}} />)
            } 
        />
    )
}

const NoAuthRoute = ({ component: Component, ...args }) => {
    const { logged } = useContext(Context);

    return (
        <Route
            {...args}
            render={ props =>
                !logged() ?
                (<Component {...props} />) : (<Redirect to={{pathname: "/"}} />)
            } 
        />
    )
}

function App() {
    const { logged, logout } = useContext(Context);

    return (
        <React.Fragment>
            <Router>
                <Navigation logged={logged()} logout={logout}/>
                    <Switch>
                        <NoAuthRoute exact path="/login" component={LoginScreen} />
                        <NoAuthRoute exact path="/register" component={RegisterScreen} />
                        <AuthRoute
                            exact path="/"
                            component={HomeScreen}
                        />
                        <AuthRoute
                            exact path="/operations"
                            component={OperationsScreen}
                        />
                        <AuthRoute
                            exact path="/users/me"
                            component={AccountScreen}
                        />
                        <AuthRoute
                            component={() => "404 not found"}
                        />
                    </Switch>
                <Footer logged={logged()}/>
            </Router>
        </React.Fragment>
    )
}

export default App;
