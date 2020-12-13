import axios from "axios";
const USER_LIST_API = "https://5ef0dc0c1faf160016b4d0a4.mockapi.io/rspack";

class AuthService {
  constructor() {}
  getAxios() {
    return axios;
  }

  loginAuth(credentials) {
    if (credentials.username === "admin@xyz.com" && credentials.password === "Admin_007") {
      let userinfo = credentials;
      let data = { message: "successfully", accountType: "admin", ...userinfo };
      return new Promise(function (resolve, reject) {
        return resolve({
          status: 200,
          data,
        });
      });
    } else {
      return this.getAxios().get(
        `${USER_LIST_API}?email=${credentials.username}&password=${credentials.password}`
      );
    }
  }
}

export default new AuthService();
