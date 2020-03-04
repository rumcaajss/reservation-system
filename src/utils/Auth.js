import Cookies from 'js-cookie';
import { firebase, firestore } from '../firebase';
const TOKEN_KEY = 'token';
const COOKIE_RGX = /xoxp(-\d+){3}-(.*)/;
export const isLoggedIn = () => {
  let cookie = Cookies.get(TOKEN_KEY);
  if (cookie && COOKIE_RGX.test(cookie)) {
    return true;
  } 
  return false;
}




// export const AuthService = {
//   isAuthed: false,
//   authenticate(cb) {
//     let cookieToken = Cookies.get('fb_token'); 

//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         console.log('User already signed in');
//         this.isAuthed = true;
//       } else {
//         if (cookieToken) {
//           firebase.auth().signInWithCustomToken(cookieToken)
//           .then(() => {
//             console.log('User has been signed in');
//             this.isAuthed = true;
//           })
//           .catch((error) => {
//             this.isAuthed = false
//             console.error('Error singing in.');
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             console.log(`Errorcode ${errorCode} and message ${errorMessage}`)
//           });
//         }
//       }
//     });


//     if (cb) {
//       cb();
//     }
//   },

//   async signOut(cb) { 
//   //  https://slack.com/api/auth.revoke?token=xoxp-37842542386-52472653349-946420560034-f32f760291e741e2b158e751830a5e84&pretty=1


//     await firebase.auth().signOut().then(() => {
//       Cookies.remove('fb_token');
//       console.log('User has been logged out');
//       this.isAuthed = false;
//     }).catch((error) => {
//       this.isAuthed = true;
//     });
//     if (cb) {
//       cb();
//     }
//   }
// }
