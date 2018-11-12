//import Axios from 'axios';
import Config from '../lib/config'
const config = new Config()
import graphql from  'graphql.js'
const API_URL = `${config.get('AUTH_URL')}graphql`;

const authApi = graphql(API_URL, {
  method: "POST", // POST by default.
  asJSON: true,
  alwaysAutodeclare: true,
  headers: {
    "Access-Token": "some-access-token"
  },
  fragments: {
    // fragments, you don't need to say `fragment name`.
//    auth: "on User { token }",
    errors: "on InputError { base fields{ key errors} }"
  }
})

authApi.q={
  login: authApi.mutate(`
     sessionLogin(login: $login, password: $password) {
        token errors {...errors}

}`)
}

export default authApi;
