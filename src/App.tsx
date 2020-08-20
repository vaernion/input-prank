import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Menu } from "./components/Menu";
import Store from "./components/Store";
import { Home } from "./routes/Home";
import { Signup } from "./routes/Signup";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Store>
          <Router>
            <nav>
              <Menu />
            </nav>
            <main>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/secret"></Route>
              </Switch>
            </main>
          </Router>
        </Store>
      </ErrorBoundary>
    </>
  );
}

export default App;
