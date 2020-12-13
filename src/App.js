import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import PageAdminDashboard from "./Containers/PageAdminDashboard";
import PageLogin from "./Containers/PageLogin";
import PageUserDashboard from "./Containers/PageUserDashboard";
import PageUserDetail from "./Containers/PageUserDetail";
import { adminDashboardLink, loginLink, userDashboardLink, userDetailLink } from "./Utils/Network";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: localStorage.getItem("userinfo")
        ? JSON.parse(localStorage.getItem("userinfo"))
        : null,
    };
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Router>
              <Switch>
                <Route
                  exact
                  path={loginLink}
                  name="Login"
                  render={(props) => <PageLogin {...props} />}
                />

                <Route
                  path={adminDashboardLink}
                  name="Dashboard"
                  render={(props) => <PageAdminDashboard {...props} />}
                />

                <Route
                  path={userDetailLink + "/:id"}
                  name="User Detail"
                  render={(props) => <PageUserDetail {...props} />}
                />

                <Route
                  path={userDashboardLink}
                  name="User Dashboard"
                  render={(props) => <PageUserDashboard {...props} />}
                />

                <Redirect from="*" to={loginLink} />
              </Switch>
            </Router>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
