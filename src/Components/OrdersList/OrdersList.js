import React, { Component } from "react";
import WebServices from "../../Services/WebServices";
import { userDetailLink } from "../../Utils/Network";
import OrderListStyle from "./OrdersList.module.css";

export class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrdersData: [],
    };
  }

  componentDidMount() {
    WebServices.getUser(10)
      .then((response) => {
        if (response && response.data) {
          this.setState({
            OrdersData: response.data,
          });
        }
      })
      .catch((error) => {
        // const ordersList = JSON.parse(localStorage.getItem("ordersList"));
        this.setState({
          offlineMode: true,
          // OrdersData: ordersList,
        });
      });
  }

  render() {
    return (
      <table className={OrderListStyle.tableScroll}>
        {this.state.offlineMode ? (
          <div className={OrderListStyle.offlineMessage}>Connection has been lost...!</div>
        ) : null}
        <thead>
          <tr>
            <th>Sr. NO.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB </th>
            <th>Age</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody className={OrderListStyle.bodyHalfScreen}>
          {this.state.OrdersData.map((data, i) => {
            return (
              <tr key={data.orderNo}>
                <td>{i + 1 + ")"}</td>
                <td>{data.firstName}</td>
                <td> {data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.dob}</td>
                <td>{`${data.age}`}</td>
                <td
                  className={OrderListStyle.viewMoreBtn}
                  onClick={() => {
                    this.props.props.history.push(`${userDetailLink}/${data.id}`);
                  }}
                >
                  {"Viwe More"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default OrdersList;
