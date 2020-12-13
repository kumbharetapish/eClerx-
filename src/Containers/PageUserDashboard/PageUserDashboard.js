import React, { Component } from "react";
import DashboardStyle from "./dashboardStyle.module.css";
import { loginLink } from "../../Utils/Network";
import WebServices from "../../Services/WebServices";
import Cart from "../../Components/Cart";

class PageUserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      addToCardProduct: [],
      message: "",
      userinfo: JSON.parse(localStorage.getItem("userinfo")),
    };
    this.addToCartProduct = this.addToCartProduct.bind(this);
    this.orderNow = this.orderNow.bind(this);
  }
  componentDidMount() {
    window.scroll(0, 0);
    if (
      this.state.userinfo &&
      this.state.userinfo.tokan &&
      this.state.userinfo.accountType === "user"
    ) {
      WebServices.getProductList()
        .then((res) => {
          if (res && res.data && res.data.length > 0) {
            this.setState({
              productList: res.data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
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

  addToCartProduct(product) {
    this.setState({
      addToCardProduct: [...this.state.addToCardProduct, product],
    });
  }

  orderNow() {
    if (this.state.userinfo && this.state.userinfo.id) {
      let userinfo = this.state.userinfo;
      userinfo.products = this.state.addToCardProduct;
      WebServices.postOrderProduct(userinfo.id, userinfo)
        .then((res) => {
          if (res.status === 201 && res.data) {
            window.confirm("Press a button!");
            this.setState({
              addToCardProduct: [],
              message: "Good News - Your has been confirm",
            });
          }
        })
        .catch((err) => {
          this.setState({
            addToCardProduct: [],
            message: "Bod News - Try agin.",
          });
        });
    }
  }
  shortProduct(cond) {
    if (cond === "higttolow") {
      let productList = this.state.productList.sort((el_h, el_L) => {
        return el_L.price - el_h.price;
      });
      this.setState({
        productList,
      });
    } else {
      let productList = this.state.productList.sort((el_h, el_L) => {
        return el_h.price - el_L.price;
      });
      this.setState({
        productList,
      });
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
        {this.state.addToCardProduct.length > 0 ? (
          <div className={DashboardStyle.rowThird}>
            <div>
              <div className={DashboardStyle.addToCardProduct}>
                <div>Sr.No</div>
                <div>Product Name</div>
                <div>Price</div>
              </div>
              {this.state.addToCardProduct.map((el, i) => {
                return (
                  <div className={DashboardStyle.addToCardProduct}>
                    <div>{i + 1}</div>
                    <div>{el.title}</div>
                    <div>{el.price}</div>
                  </div>
                );
              })}
            </div>
            <div>
              <div className={DashboardStyle.buttonAddCart} onClick={this.orderNow}>
                Order Now{" "}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              color: "#fff",
            }}
          >
            {this.state.message}
          </div>
        )}

        <div className={DashboardStyle.rowThird}>
          <div>
            <h2>
              Product <div onClick={() => this.shortProduct("higttolow")}>High to Low</div>
              <div onClick={() => this.shortProduct()}>Low to High</div>
            </h2>

            <div className={DashboardStyle.cartWapper}>
              {this.state.productList.map((el) => {
                return (
                  <div className={DashboardStyle.cartCantainer}>
                    <Cart {...this.props} data={el} />

                    <div
                      className={DashboardStyle.buttonAddCart}
                      onClick={() => this.addToCartProduct(el)}
                    >
                      Add Card
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageUserDashboard;
