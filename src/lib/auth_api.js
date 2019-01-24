//import Axios from 'axios';
import Config from '../lib/config'
const config = new Config()
import graphql from  'graphql.js'
const API_API_URL = `${config.get('AUTH_API_URL')}graphql`;
import {LocalStorage} from 'quasar'



const authApi = function() {
  var token=LocalStorage.get.item('login_token');
  console.log("token",token)
  return graphql(API_API_URL, {
    method: "POST", // POST by default.
    asJSON: true,
    alwaysAutodeclare: true,
    headers: {
      "Access-Token": token
    },
    fragments: {
      // fragments, you don't need to say `fragment name`.
      //    auth: "on User { token }",
      errors: "on InputError { base fields{ name errors} }"
    }
  })
}

const q={
  login: function(vars) {
    var res=authApi().mutate(`
     sessionLogin(login: $login, password: $password) {
        token errors {...errors}}`)(vars)
    return res
  },
  changePassword: function(vars) {
    var res=authApi().mutate(`
     changePassword(login: $login,
                    currentPassword: $currentPassword,
                    newPassword: $newPassword,
                    newPasswordConfirmation: $newPasswordConfirmation
) {
        success errors {...errors}}`)(vars)
    return res
  },
  signup: function(vars) {
    var res=authApi().mutate(`
     signup(login: $login,
            password: $password
) {
        success  errors {...errors}}`)(vars)
    return res
  }
}
//, {}, }

export default q;
