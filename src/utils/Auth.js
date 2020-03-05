import Cookies from 'js-cookie';
import { firebase } from '../firebase';
const TOKEN_KEY = 'fb_token';


export const AuthService = {
  authenticate(cb) {
    let cookieToken = Cookies.get(TOKEN_KEY); 
    if (cookieToken) {
      firebase.auth().signInWithCustomToken(cookieToken)
      .then(() => {
        if (cb) {
          cb();
        }
      }).catch((error) => {
          console.error('Error singing in.');
      });
    }
  },
  
  async isAuthed(cb) {
    await firebase.auth().onAuthStateChanged((user) => {
      user ? cb(true) : cb(false);
    });
  },

  async signOut(cb) { 
    await firebase.auth().signOut().then(() => {
      Cookies.remove(TOKEN_KEY);
      console.log('User has been logged out');
    }).catch((error) => {
      console.log('error logging out'); 
    });
    if (cb) {
      cb();
    }
  }
}
