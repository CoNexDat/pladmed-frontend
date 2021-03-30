import React, { useContext } from 'react';
import LoginScreen from './screens/login/login_screen'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ContextProvider } from './controllers/context_provider';
import HomeScreen from './screens/home/home_screen'
import OperationsScreen from './screens/operations/operations_screen'
import AccountScreen from './screens/account/account_screen'
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
    return (
        <React.Fragment>
            <ContextProvider>
                <Router>
                    <Switch>
                        <Route path="/login" component={LoginScreen} />
                        <>
                            <Navigation />
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
                            <Footer />
                        </>
                    </Switch>
                </Router>
            </ContextProvider>
        </React.Fragment>
    )
}

export default App;
