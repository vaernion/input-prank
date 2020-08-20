import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Menu } from "./components/Menu";
import Store from "./components/Store";
import { Home } from "./routes/Home";
import { Secret } from "./routes/Secret";
import { Signup } from "./routes/Signup";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Store>
          <Router basename={process.env.PUBLIC_URL}>
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
                <Route path="/secret">
                  <Secret />
                </Route>
              </Switch>
            </main>
          </Router>
        </Store>
      </ErrorBoundary>
    </>
  );
}

export default App;
