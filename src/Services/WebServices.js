import axios from "axios";
const USER_LIST_API = "https://5ef0dc0c1faf160016b4d0a4.mockapi.io/rspack";
const PRODUCT_LIST_API = "https://fakestoreapi.com/products";

class WebServices {
  getAxios() {
    return axios;
  }

  getUser() {
    return this.getAxios().get(`${USER_LIST_API}`);
  }

  getUserById(id) {
    return this.getAxios().get(`${USER_LIST_API}?id=${id}`);
  }

  getProductList() {
    return this.getAxios().get(PRODUCT_LIST_API);
  }

  postOrderProduct(id, info) {
    return this.getAxios().post(`${USER_LIST_API}?id=${id}`, info);
  }
}

export default new WebServices();
