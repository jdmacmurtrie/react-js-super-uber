import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import FormContainer from "./FormContainer";
import Summary from "./Summary";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/summary" component={Summary} />
          <Route path="/" component={FormContainer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
