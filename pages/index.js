import React from "react";
import Link from "next/link";
import { auth, firebase } from "../src/firebase";
class Home extends React.Component {
    handleSignInGoogle = () => {
        var loginGooogle = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(loginGooogle)
            .then((user) => {
              this.checkLogin(user);
                console.log("You are signed In", user);
                auth.currentUser.getIdToken(true).then(function (idToken) {
                    console.log("ID TOken :", idToken);
                });
            })
            .catch((err) => {
                this.mergeData(error);
            });
    };
    // chek Login or not
    checkLogin = (parameters) => {
      // var a = auth.currentUser;
      console.log("check Login", parameters);
    }
    // handling auth/account exists with different credential
    mergeData = (parameters) => {
        if (
            parameters.code === "auth/account-exists-with-different-credential"
        ) {
            var pendingCred = parameters.credential;
            var email = parameters.email;
            auth.fetchSignInMethodsForEmail(email).then(function (methods) {
                console.log("methods : ", methods);
                var provider = methods[0];
                console.log("provider : ", provider);
                var existLogin = "";
                if (provider === "google.com") {
                    existLogin = new firebase.auth.GoogleAuthProvider();
                } else {
                    existLogin = new firebase.auth.FacebookAuthProvider();
                }
                auth.signInWithPopup(existLogin).then(function (result) {
                    console.log("result :", result);
                });
            });
        }
    };
    handleSignInFB = () => {
        var loginFB = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(loginFB)
            .then(() => {
                alert("You are signed In");
            })
            .catch((error) => {
                this.mergeData(error);
            });
    };
    handleLogout = () => {
        auth.signOut()
            .then(function () {
                alert("Logout successful");
            })
            .catch(function (error) {
                alert("OOps something went wrong check your console");
                console.log(err);
            });
    };
    render() {
        return (
            <div>
                <div className="hero">
                    <h1 className="title">
                        Welcome to Firebase Authentication in Next.js!
                    </h1>
                    <p className="description">
                        Click on the Dashboard link to visit the dashboard page.
                    </p>
                    <div className="row">
                        <Link href="/dashboard">
                            <a className="card">
                                <h3>Go to Dashboard&rarr;</h3>
                                <p>Visit Dashboard</p>
                            </a>
                        </Link>
                        <a href="#" onClick={this.handleSignInGoogle}>
                            <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"></img>
                        </a>
                        <a href="#" onClick={this.handleSignInFB}>
                            <img
                                src="https://i.stack.imgur.com/Ar2Uo.png"
                                width="200px;"></img>
                        </a>
                        
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;
