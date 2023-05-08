import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc, collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "../firebase_setup/firebase";
import { app } from "../firebase_setup/firebase";
import { userId, isLoggedIn } from "../actions";
const auth = getAuth(app);
auth.useDeviceLanguage();
const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier('sign_up_button', {
            'size': 'invisible',
            'callback': (response) => {
                onSingup();
            }
        }, auth);
        window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
        });
    }
}
const onSingup = (contact, userid = "", resend = false) => {
  if (!resend) {
    onCaptchVerify();
  }
  const appVerifier = window.recaptchaVerifier;
  let recaptchaResponse;
  if (resend) {
    signInWithPhoneNumber(auth, contact, appVerifier)
      .then((confirm) => {
        window.confirmationResult = confirm;
        console.warn("OTP Re-sent Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    signInWithPhoneNumber(auth, contact, appVerifier)
      .then((confirm) => {
        recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
        window.confirmationResult = confirm;
        if (userid !== "") {
          localStorage.setItem("uid", userid);
        }
        console.warn("OTP Sent Successfully");
      })
      .catch((err) => {
        window.recaptchaVerifier
          .render()
          .then(function (widgetId) {
            grecaptcha.reset(widgetId);
          });
        console.log(err);
      });
  }
};


var credentials = "";
const onOTPVerify = (otp, checkVerified = () => { }) => {
    window.confirmationResult.confirm(otp).then((res) => {
        checkVerified()
    }).catch(err => console.log("error---> ", err))
}
const onLoginVerification = async (id, contact, setOtpSent = () => { }, setUid = () => { }) => {
    onSingup(contact, contact.slice(3));
    setOtpSent(true);
}

const checkUserAuth = (dispatch) => {
    const user = auth.currentUser;
    if (user) {
        dispatch(isLoggedIn(true))
        dispatch(userId(user.phoneNumber))
    } else {
        console.log("user is signed out");
    }
};
const signOutUser = (dispatch) => {
    signOut(auth).then(() => {
        dispatch(isLoggedIn(false))
        dispatch(userInfo({}));
    }).catch((error) => {
    });

}
export { onSingup, onOTPVerify, credentials, onLoginVerification, checkUserAuth, signOutUser };