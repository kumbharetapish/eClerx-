import React from "react";
import cartStyle from "./Card.module.css";

const Cart = (props) => {
  const { category, description, image, price, title } = props.data;

  return (
    <div className={cartStyle.cart}>
      <div className={cartStyle.imgWrapper}>
        <img src={image} alt={props.id} className={cartStyle.img} />
      </div>

      <div className={cartStyle.msgWrapper}>
        <p>
          <strong>{title} </strong> <br />
          {`Price : ${price} Rs.`}
        </p>
        <p className={cartStyle.msgTime}> {`Category : ${category}`} </p>
      </div>
    </div>
  );
};
export default Cart;
