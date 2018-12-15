import {LocalStorage} from 'quasar'
import Session from '../../lib/session'

export function login (state,token) {
  console.log("action login", token)
  state.session = new Session(token)
  LocalStorage.set('login_token',
                           token);
}
