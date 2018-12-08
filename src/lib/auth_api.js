//import Axios from 'axios';
import Config from '../lib/config'
const config = new Config()
import graphql from  'graphql.js'
const API_URL = `${config.get('AUTH_URL')}graphql`;
import {LocalStorage} from 'quasar'



const authApi = function() {
  var token=LocalStorage.get.item('login_token');
  console.log("token",token)
  return graphql(API_URL, {
    method: "POST", // POST by default.
    asJSON: true,
    alwaysAutodeclare: true,
    headers: {
      "Access-Token": token
    },
    fragments: {
      // fragments, you don't need to say `fragment name`.
      //    auth: "on User { token }",
      errors: "on InputError { base fields{ key errors} }"
    }
  })
}

const q={
  login: function(vars) {
    var res=authApi().mutate(`
     sessionLogin(login: $login, password: $password) {
        token errors {...errors}}`)(vars)
    return res
  }
}
//, {}, }

export default q;
