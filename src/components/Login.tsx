import React, { useRef, useState } from "react";
import Header from "./Header";
import { BG_URL, USER_AVATAR } from "../utils/constant";
import { loginValidation } from "../utils/validations";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login: React.FC = () => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState<any>(null);

  const onSignInToggal = () => {
    setSignInForm(!isSignInForm);
  };

  const clearInputFieldData = ()=> {
    if (email.current) {
      email.current.value = '';
    }
    
    if (password.current) {
      password.current.value = '';
    }
  }

  const onSubmitBtnClick = () => {

    const validation = loginValidation(
      isSignInForm,
      name?.current?.value,
      email.current?.value,
      password.current?.value
    );

    setErrorMessage(validation);

    if (validation) return;

    if (isSignInForm) {
      if (email.current?.value && password.current?.value) {
        signInWithEmailAndPassword(
          auth,
          email.current?.value,
          password.current?.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            updateProfile(user, {
              displayName: name?.current?.value || '',
              photoURL: USER_AVATAR,
            })
              .then(() => {
                if(auth.currentUser){
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
                navigate('/browse')
              }
              })
              .catch((error) => {
                alert(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
              });
           
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
            clearInputFieldData();
            navigate('/')
          });
      }
    } else {
      if (email.current && password.current) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current?.value
        )
          .then((userCredential) => {
            clearInputFieldData();
            if (!auth.currentUser) {
              // user not logged in
              return;
            }
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate('/browse')
            
          })
          .catch((error: { code: any; message: any }) => {
            alert(error)
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
            clearInputFieldData();
            navigate('/')
          });
      }
    }
  };

  return (
    <div>
      <Header />
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          className="object-cover w-full h-full"
          src={BG_URL}
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
      {/* Centered Form */}
      <div className="flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full md:w-3/12 absolute p-12 bg-black my-20 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        >
          <h1 className="font-bold text-3xl mb-6 text-center">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-2 w-full bg-gray-700 rounded-lg"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
          <p className="text-red-500 text-lg px-1 py-1">{errorMessage}</p>
          <button
            className="p-4 my-4 bg-red-700 w-full rounded-lg hover:bg-red-800 transition"
            onClick={onSubmitBtnClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="py-4 text-center text-sm">
            {isSignInForm ? "New to Netflix ? " : "Already registered ? "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => onSignInToggal()}
            >
              {isSignInForm ? "Sign up now " : " Sign in Now "}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
