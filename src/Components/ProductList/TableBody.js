import React, { Component } from "react";
import ProductListStyle from "./ProductList.module.css";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: !!this.props.complete || false,
      value: null,
      valueArr: []
    };
    this.checkboxInput = React.createRef();
  }

  handleChange = () => {
    // console.log("handleChange", this.refs.complete.checked);
    const value = this.refs.complete.value;
    // console.log(this.refs.complete.checked ? value : null);
    this.setState({
      complete: this.refs.complete.checked,
      value: this.refs.complete.checked ? value : null
    });
    this.props.handleMultiDelete(this.refs.complete.value);
  };

  handleSelectRow = i => {
    this.props.handleSelectRow(i);
    this.setState({
      complete: this.refs.complete.unchecked
    });
  };

  render() {
    return (
      <tr key={this.props.keys}>
        <td className={ProductListStyle.selProduct}>
          <label className={ProductListStyle.container}>
            <input
              type="checkbox"
              value={this.props.listData.name}
              checked={this.state.complete}
              ref="complete"
              onChange={this.handleChange}
            />
            <span className={ProductListStyle.checkmark}></span>
          </label>
        </td>
        <td className={ProductListStyle.name}>{this.props.listData.name}</td>
        <td className={ProductListStyle.stock}>
          {this.props.listData.unitSold}
        </td>
        <td className={ProductListStyle.stock}>{this.props.listData.stock}</td>
        <td className={ProductListStyle.expireDate}>
          {this.props.listData.expireDate}
        </td>
        <td className={ProductListStyle.selProduct}>
          <div
            className={ProductListStyle.deleteBtn}
            onClick={() => this.handleSelectRow(this.state.value)}
          >
            <i className="far fa-trash-alt"></i>
          </div>
        </td>
      </tr>
    );
  }
}

export default TableBody;
