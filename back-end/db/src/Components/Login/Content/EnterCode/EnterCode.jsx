import React, { useState, useEffect } from "react";
import Button1 from "../Button/Button1";
import Input from "../InputBox/Input";
import Heading from "../Heading/Heading";
import Button2 from "../Button/Button2";
import { useNavigate } from "react-router-dom";
import {
  matchingOtp,
  saveUserSignupData,
  sendingMailForOtp,
  settingOtp,
} from "../../../../redux/actionCreators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { toasterFunction } from "../../../Utility/utility";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";

const EnterCode = ({ title }) => {
  {
    /* send code timing implemented dynamically */
  }
  const [timer, setTimer] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { otp, emailExist, isEmailOtp, isPhoneNo } = useSelector(
    (state) => state.authReducer
  );
 

  const timerFunction = async () => {
    const dataObj = {
      datetime: Date.now().toString(),
      uemail: emailExist?.data?.uemail,
      // password: formik.values.password,
    };
    dispatch(settingOtp(""));
    setIsLoading(true);
    await dispatch(sendingMailForOtp(dataObj))
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        dispatch(settingOtp(""));
        toast.success(res.message);
      })
      .catch((err) => {
        console.log("nOT gONE");
        toast.error(err.message);
      });
    console.log("eNTERY");
    // const code = getCodeFromUserInput();

    if (timer === false) {
      setTimer(true);
      setTimeout(() => {
        setTimer(false);
      }, 5 * 60 * 1000);
    }
  };

  const onConfirmOtp = async () => {
    setIsLoading(true);
   
    console.log("emailExist?.data?.umobile.includes('@'')", isPhoneNo);
    if (isPhoneNo) {
      console.log("================ PHONEEEE");
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          console.log("FirebAse Otp Verified", result);
          const user = result.user;
          setIsLoading(false);
          navigate("/auth/forgetpassword");
          console.log("FirebAse Otp user", user);
          // ...
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("...........>>>>>>>", error);
          toasterFunction(error);

          // User couldn't sign in (bad verification code?)
          // ...
        });
    }

    if (emailExist?.data?.uemail) {
      console.log("Insideeeee", emailExist?.data?.uemail);
      const result = await dispatch(matchingOtp(emailExist?.data?.uemail, otp));
      console.log("+++++++++++++", result);
      if (!result.status) {
        dispatch(settingOtp(""));
        setIsLoading(false);
        return toast.error(result.message);
      }
      setIsLoading(false);
      navigate("/auth/forgetpassword");
      toast.success(result.message);
    }
  };

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

    return (
      <div
        disabled="disabled"
        className="bg-gray-600 text-white w-[70%] rounded-3xl py-2 text-center font-bold text-xs"
      >
        {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
        {seconds % 60}
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
  const navigate = useNavigate();
  console.log("emailExist?.data", emailExist?.data);
  return (
    <>
      {/* padding added */}
      <div className="w-full h-full py-[20px] rounded-[20px] flex flex-col justify-center items-center gap-1">
        <Heading title={title} />
        {/* font-size increased, color changed */}
        <p className="text-[10px] font-bold w-[78%] text-center mb-2">
          Please enter the code which we’ve sent to your Email : &nbsp;
          {emailExist?.data?.uemail
            ? emailExist?.data?.uemail
            : emailExist?.data?.umobile}
        </p>
        <div className="w-[85%] mb-2">
          <Input
            title="Enter your code"
            name="entercode"
            type="number"
            borderColor={false}
            errorMessage="You've reached maximum attempts. Please try again from login"
            inputValue={otp}
            onHandleChange={onChangeHandler}
          />
        </div>
        <Button2
          title="Confirm"
          onClick={onConfirmOtp}
          disabled={
            isEmailOtp
              ? otp.toString()?.length != 4
              : otp.toString()?.length != 6
          }
        />
        {otp.toString()?.length > 4}
        {/* padding added to send code button */}
        {timer ? (
          <Timer />
        ) : (
          <Button1 title="Send Code Again" onClick={timerFunction} />
        )}
        <Button2 title="Cancel" onClick={() => navigate("/auth/login")} />
      </div>
      {loading && <Loader />}
    </>
  );
};

export default EnterCode;
