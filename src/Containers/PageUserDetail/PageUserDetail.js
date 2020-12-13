import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import WebServices from "../../Services/WebServices";
import { adminDashboardLink, loginLink } from "../../Utils/Network";
import AccountStyle from "./Accounts.module.css";

class PageUserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: null,
      userinfo: JSON.parse(localStorage.getItem("userinfo")),
    };
  }

  componentDidMount() {
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

    let id = this.props.match.params.id;
    WebServices.getUserById(id)
      .then((response) => {
        if (response && response.data && response.data.length > 0)
          this.setState({
            userDetail: response.data[0],
          });
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  render() {
    return (
      <div className={AccountStyle.accountContainer}>
        <form onSubmit={this.handleResponseSend} className={AccountStyle.fromContainer}>
          <div className={AccountStyle.uploadWrapper}>
            <h2> Profile Picture </h2>
            <div className={AccountStyle.uploadImg}>
              <img
                className={AccountStyle.previewImg}
                src={
                  this.state.userDetail && this.state.userDetail.profilePic
                    ? this.state.userDetail && this.state.userDetail.profilePic
                    : ""
                }
                alt=""
              />
            </div>
          </div>

          <div className={AccountStyle.fromWrapper}>
            <h2> User Details </h2>
            <div>
              <div className={AccountStyle.colum}>
                <label for="accountName">
                  First Name
                  <input
                    type="input"
                    name="accountName"
                    value={
                      this.state.userDetail && this.state.userDetail.firstName
                        ? this.state.userDetail.firstName
                        : ""
                    }
                  />
                </label>
                <label for="email">
                  Email
                  <input
                    type="input"
                    name="email"
                    value={
                      this.state.userDetail && this.state.userDetail.email
                        ? this.state.userDetail.email
                        : ""
                    }
                    required
                  />
                </label>
                <label for="phone">
                  User Age
                  <input
                    type="input"
                    pattern="[0-9]{2}"
                    name="phone"
                    value={
                      this.state.userDetail && this.state.userDetail.age
                        ? this.state.userDetail.age
                        : ""
                    }
                  />
                </label>
              </div>

              <div className={AccountStyle.colum}>
                <label for="expireDate">
                  Last Name
                  <input
                    type="input"
                    name="email"
                    onChange={(e) => this.handleEmailChange(e.target.value)}
                    value={
                      this.state.userDetail && this.state.userDetail.lastName
                        ? this.state.userDetail.lastName
                        : ""
                    }
                    required
                  />
                </label>
                <label for="password">
                  Password
                  <input
                    type="password"
                    name="rePassword"
                    value={
                      this.state.userDetail && this.state.userDetail.password
                        ? this.state.userDetail.password
                        : ""
                    }
                  />
                </label>
                <label for="productName">
                  <label for="dob">
                    DOB
                    <input
                      type="input"
                      name="password"
                      value={
                        this.state.userDetail && this.state.userDetail.dob
                          ? this.state.userDetail.dob
                          : ""
                      }
                      required
                    />
                  </label>
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={AccountStyle.button}
                onClick={() => this.props.history.push(adminDashboardLink)}
              >
                {"Back"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PageUserDetail;
