import React from 'react';
import RootScreen from './screens/root_screen'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={RootScreen} />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default App;
