import Axios from 'axios';
import Config from '../lib/config'
const config = new Config()
let store = null;

export default class BaseAPI {
  constructor(apiUrl) {
    this.axios = Axios.create({
      baseURL: apiUrl,
    });
  }

  static setStore(newStore) { store = newStore; }
}

export const API_URL = `${config.get('AUTH_URL')}api`;

class AuthApi extends BaseAPI {
  constructor() {
    super(API_URL);
  }

  session_login(login, password) {
    return this.axios.post('session',{
      login,
      password
    });
  }
}
const authApi =  new AuthApi();

export {
  authApi
}
