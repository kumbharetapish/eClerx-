import React, { Component } from "react";
import WebServices from "../../Services/WebServices";
import ProductList from "../../Components/ProductList/ProductList";
import TableBody from "../../Components/ProductList/TableBody";
// import ProductCategories from "../../Components/ProductCategories/ProductCategories";
import ProductStyle from "./Product.module.css";
import { loginLink } from "../../Utils/Network";

// import { Add_New_Link } from "../../Utils/Network";
export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueArr: [],
      selectObj: [],
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    if (
      this.state.userinfo &&
      this.state.userinfo.tokan &&
      this.state.userinfo.accountType === "user"
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

    // WebServices.getResponse()
    //   .then((response) => {
    //     this.setState({
    //       products:
    //         localStorage.getItem("products") === null
    //           ? response.productsPage.products
    //           : JSON.parse(localStorage.getItem("products")),
    //       createdProduct: response.productsPage.categories,
    //     });

    //     localStorage.setItem("products", JSON.stringify(this.state.products));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  handleSingleDelete = (i) => {
    const arrayCopy = this.state.products.filter((row) => row.name !== i);
    localStorage.setItem("products", JSON.stringify(arrayCopy));
    this.setState({ products: arrayCopy });
  };

  selectMultiDelete = (value) => {
    this.handleMultiDelete();
    let Values = [...this.state.valueArr].concat(value);
    this.setState({ valueArr: Values });
  };

  handleMultiDelete = () => {
    var filtered = [];
    this.state.products.map((data, i) => {
      if (data.name !== this.state.valueArr.indexOf(data.name)) {
        this.state.valueArr.forEach((element) => {
          return data.name === element ? filtered.push(data) : null;
        });
      }
      return filtered;
    });
    this.setState({ selectObj: filtered });
  };

  deleteMultiRow = () => {
    const newTable = this.state.products.filter((data) => {
      return this.state.selectObj.indexOf(data) === -1;
    });

    localStorage.setItem("products", JSON.stringify(newTable));
    this.setState({ products: newTable });
    console.log(newTable);
  };

  render() {
    const list = this.state.products.map((res, i) => {
      return (
        <TableBody
          handleSelectRow={this.handleSingleDelete}
          handleMultiDelete={this.selectMultiDelete}
          keys={i}
          listData={res}
        />
      );
    });

    // const categories = this.state.createdProduct.map((res) => {
    //   return <ProductCategories kye={res} categoriesName={res} />;
    // });

    return (
      <div className={ProductStyle.productContainer}>
        <div className={ProductStyle.productListContainer}>
          <div className={ProductStyle.productListWrapper}>
            <ProductList>{list}</ProductList>
          </div>

          <button
            type="submit"
            className={ProductStyle.button}
            // onClick={() => this.props.history.push(Add_New_Link)}
          >
            {"Add New Product"}
          </button>
          <button type="submit" className={ProductStyle.button} onClick={this.deleteMultiRow}>
            {"Delete Selected Products"}
          </button>
        </div>
        <div className={ProductStyle.productCategoriesContainer}>
          <div className={ProductStyle.productCategoriesWrapper}>
            <div className={ProductStyle.categoriesName}>
              <h2>Product Categories </h2>
            </div>
            {/* {categories} */}
            <button type="submit" className={ProductStyle.button}>
              {"Add categories"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
