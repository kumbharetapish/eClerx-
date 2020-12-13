import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import OrdersList from "../../Components/OrdersList/OrdersList";
import WebServices from "../../Services/WebServices";
import { loginLink } from "../../Utils/Network";
import DashboardStyle from "./Dashboard.module.css";

export class PageAdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: JSON.parse(localStorage.getItem("userinfo")),
      loginStatus: "false",
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    if (
      this.state.userinfo &&
      this.state.userinfo.tokan &&
      this.state.userinfo.accountType === "admin"
    ) {
      this.setState({
        loginStatus: "true",
      });
    } else {
      this.setState(
        {
          loginStatus: "false",
        },
        () => {
          this.props.history.push(loginLink);
        }
      );
    }
  }

  render() {
    return (
      <div className={DashboardStyle.Container}>
        <div className={DashboardStyle.headingRow}>
          <div>
            <p>
              Welcome,{" "}
              <h2>{this.state.userinfo.userName ? this.state.userinfo.userName : "Admin"}</h2>
            </p>
          </div>
          <div>
            <div
              className={DashboardStyle.logoutBtn}
              onClick={() => {
                localStorage.clear();
                this.props.history.push(loginLink);
              }}
            >
              Logout
            </div>
          </div>
        </div>

        <div className={DashboardStyle.rowThird}>
          <div>
            <h2>Order </h2>
            <OrdersList props={this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default PageAdminDashboard;
