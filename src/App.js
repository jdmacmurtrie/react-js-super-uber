import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import "./App.scss";

import FormContainer from "./containers/FormContainer";
import Summary from "./containers/Summary";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/summary" component={Summary} />
            <Route path="/" component={FormContainer} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
