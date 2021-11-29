import Cookies from "js-cookie";

export const AUTH_KEYS = {
  TOKEN: "auth-token",
  USER: "auth-user",
};

class AuthHelper {
  static getToken = () => Cookies.get(AUTH_KEYS.TOKEN);

  static setToken = (token) =>
    Cookies.set(AUTH_KEYS.TOKEN, token, { expires: 7 });

  static removeToken = () => Cookies.remove(AUTH_KEYS.TOKEN);

  static setUser = (user) => Cookies.set(AUTH_KEYS.USER, JSON.stringify(user));

  static getUser = () => {
    const user = Cookies.get(AUTH_KEYS.USER);

    try {
      return JSON.parse(user);
    } catch {
      return;
    }
  };

  static removeUser = () => Cookies.remove(AUTH_KEYS.USER);
}

export default AuthHelper;
