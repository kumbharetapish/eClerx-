import React from "react";
import ProductListStyle from "./ProductList.module.css";

const ProductList = props => {
  return (
    <table className={ProductListStyle.tableScroll}>
      <thead>
        <tr>
          <th className={ProductListStyle.selProduct}></th>
          <th className={ProductListStyle.name}>PRODUCT NAME</th>
          <th className={ProductListStyle.stock}>UNIT SOLD</th>
          <th className={ProductListStyle.stock}>IN STOCK</th>
          <th className={ProductListStyle.expireDate}>EXPIRE DATE </th>
          <th className={ProductListStyle.selProduct}> </th>
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};
export default ProductList;
