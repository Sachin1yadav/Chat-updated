import React, { useState, useEffect, useRef } from "react";
import Button1 from "../Button/Button1";
import Input from "../InputBox/Input";
import Heading from "../Heading/Heading";
import Button2 from "../Button/Button2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  isOtpValid,
  matchingOtp,
  saveUserSignupData,
  settingOtp,
  userRegistration,
} from "../../../../redux/actionCreators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { toasterFunction } from "../../../Utility/utility";
import firebaseApp, { getFirebaseToken } from "../../../../config/firebase";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";

import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import Portals from "../../../Portals/Portals";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";
// import { requestNotificationPermission } from "../../../../config/firebase";

const SignupOtp = ({ title }) => {
  const captchaEl = useRef();
  {
    /* send code timing implemented dynamically */
  }
  const phoneNumberRules = /[0-9]{10}$/;
  const navigate = useNavigate();
  const [timer, setTimer] = useState(true);
  const params = useParams();
  const location = useLocation();
  const [state, setState] = useState({});
  const { showModal } = state;
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const { otp, signupData, isEmailOtp, isPhoneNo, userInfo } = useSelector(
    (state) => state.authReducer
  );

  const timerFunction = async () => {
    const dataObj = {
      datetime: Date.now().toString(),
      profileType: signupData.profileType,
      uemail: signupData.uemail,
      // password: formik.values.password,
    };

    setIsLoading(true);
    dispatch(settingOtp(""));

    const resendOtp = await dispatch(saveUserSignupData(dataObj));
    if (resendOtp?.data?.status) {
      setIsLoading(false);
      toast.success(resendOtp?.data?.message);
    } else {
      setIsLoading(false);
      toast.error(resendOtp?.data?.message);
    }
    if (phoneNumberRules.test(signupData?.uemail)) {
      setIsLoading(false);
      signIn("+91" + signupData?.uemail);
    }

    if (timer === false) {
      setTimer(true);
      setTimeout(() => {
        setTimer(false);
      }, 5 * 60 * 1000);
    }
  };
  const handleClose = () => setState({ ...state, showModal: false });

  const onConfirmOtp = async () => {
    setIsLoading(true);
    if (otp?.length < 4) {
      setIsLoading(false);
      return;
    }
    if (isPhoneNo) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          dispatch(settingOtp(""));
          setState({ ...state, showModal: true });
          // User signed in successfully.
          const user = result.user;
          setIsLoading(false);
          dispatch(isOtpValid({ validOtp: true, userInfo: false }));
          navigate(`/auth/verification/signup?${userInfo?.profileType}`);
        })
        .catch((error) => {
          setIsLoading(false);
          // User couldn't sign in (bad verification code?)
        });
    }
    if (signupData?.uemail) {
      const result = await dispatch(matchingOtp(signupData?.uemail, otp));
      if (!result?.status) {
        setIsLoading(false);
        toasterFunction(result?.message);
      } else {
        const payload = {
          password: signupData.password,
          datetime: Date.now().toString(),
          uemail: signupData.uemail
        }
        dispatch(userRegistration(payload))
        // setState({ ...state, showModal: true });
        dispatch(isOtpValid({ validOtp: true, userInfo: false }));
        navigate(`/auth/verification/signup?${userInfo?.profileType}`);
      }
    }
    getFirebaseToken()
      .then(async (res) => {
        const data = {
          datetime: Date.now(),
          deviceid: uuid(),
          password: userInfo?.password,
          token: res,
          uemail: userInfo?.uemail,
          //  "umobile": "weware5007@fectode.com"
        };

        console.log("getFirebaseToken", data);
            console.log("Singu[pppppppppppppp", userInfo);
        await dispatch(userRegistration(data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate("/auth/createUser")
    setIsLoading(false);
    // toasterFunction(result?.message);
  };

  function configureRecaptcha(phoneNumber, auth) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // console.log(response, 'otppppppppppp sentttttt');
        },
      },
      auth
    );
  }

  function signIn(phoneNumber) {
    const auth = getAuth();
    try {
      configureRecaptcha(signupData?.uemail, auth);
    } catch (err) {
      console.log(err, "captcha error");
    }
    // const auth = getAuth();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmation) => {
        window.confirmation = confirmation;
        navigate(`/auth/verification/signup?${profileType}`);
      })
      .catch((err) => {
        captchaEl.current.innerHTML = null;
        console.log("otp not send", err);
      });
  }

  function Timer() {
    const [seconds, setSeconds] = useState(5 * 60);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(intervalId);
            setTimer(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
      <div
        disabled="disabled"
        className="bg-[#6F6F6F] text-white w-[70%] rounded-3xl py-2 text-center font-bold text-xs"
      >
        {minutes}:{remainingSeconds < 10 ? "0" : ""}
        {remainingSeconds}
      </div>
    );
  }
  const onChangeHandler = (event) => {
    if (isEmailOtp) {
      if (event.target.value.length > 4) {
        dispatch(
          settingOtp(event.target.value.slice(0, event.target.value.length - 1))
        );
      } else {
        dispatch(settingOtp(event.target.value));
      }
    } else {
      if (event.target.value.length > 6) {
        dispatch(
          settingOtp(event.target.value.slice(0, event.target.value.length - 1))
        );
      } else {
        dispatch(settingOtp(event.target.value));
      }
    }
  };

  return (
    <>
      {/* padding added */}
      <div className="w-full h-full p-1 rounded-[20px] flex flex-col justify-center items-center gap-1">
        <Heading title={title} />
        {/* font-size increased, color changed */}
        <p className="text-[10px] font-bold w-[78%] text-center mb-2">
          Please enter the code which we’ve sent to your
          {signupData?.uemail ? " Email " : " Phone no "} : &nbsp;
          {signupData?.uemail ? signupData?.uemail : isPhoneNo}
        </p>
        <div className="w-[85%]">
          <Input
            type="number"
            title="Enter Code"
            name="entercode"
            errorMessage="You've reached maximum attempts. Please try again from login"
            inputValue={otp}
            borderColor={false}
            onHandleChange={onChangeHandler}
          />
        </div>
        <div ref={captchaEl} id="sign-in-button"></div>
        <Button1
          id={"sign-in"}
          title="Confirm"
          onClick={onConfirmOtp}
          otp={otp}
          disabled={isEmailOtp ? otp?.length != 4 : otp?.length != 6}
        />
        {/* padding added to send code button */}
        {timer ? (
          <Timer />
        ) : (
          <Button2 title="Send Code Again" onClick={timerFunction} />
        )}
        <Button2
          title="Cancel"
          path="/"
          onClick={() => navigate("/auth/signup")}
        />
      </div>
      {loading && <Loader />}
    </>
  );
};

export default SignupOtp;
