import React, { useState } from "react";
import Input from "../InputBox/Input";
import Button from "../Button/Button1";
import Heading from "../Heading/Heading";
import PasswordInput from "../InputBox/PasswordInput";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import Button2 from "../Button/Button2";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { savingNewPassword } from "../../../../redux/actionCreators/authActionCreator";
import { toasterFunction } from "../../../Utility/utility";
import questionMark from "../../../../../public/images/questionMark.png";
import Loader from "../../../common/Loader";

const NewPassword = () => {
  const navigate = useNavigate();
  const { emailExist } = useSelector((state) => state.authReducer);
  const [loading, setIsLoading] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number"),

      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password does not match"
      ),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      const dataObj = {
        password: formik.values.password,
        uemail: emailExist.data.uemail
          ? emailExist.data.uemail
          : emailExist?.data?.umobile,
      };
      console.log("dataObj", dataObj);
      const newPasswordStatus = await dispatch(savingNewPassword(dataObj));

      if (!newPasswordStatus.status) {
        setIsLoading(false);
        return toasterFunction(newPasswordStatus.message);
      }
      setIsLoading(false);
      toasterFunction(newPasswordStatus.message);
      navigate("/select");
    },
  });
  const onhandleChange = (e) => {
    if (e.target.value.length > 50) {
      formik.handleChange(e.target.value.slice(0, e.target.value.length - 1));
    } else {
      formik.handleChange(e);
    }
  };
  const passwordRules = /^(?=.*\d)(?=.*[a-z]).{5,}$/;
  const validatePassword = (password) => {
    return passwordRules.test(password);
  };

  console.log("emailExist", emailExist?.data?.umobile);
  return (
    <>
      <div className="w-full h-full rounded-[20px] flex flex-col justify-center items-center gap-3 p-5">
        <Heading title="Create a New Password" />
        <div className="text-xs font-bold text-black flex items-center self-start relative w-full">
          <span> Password Help</span>
          <span
            className="ml-1 mt-0.5"
            // title="Password should be minimum of 8 length characters with one numerical value"
          >
            <img
              src={questionMark}
              alt=""
              className="w-[15px] h-[15px] cursor-pointer"
              onClick={() => setShowTitle(!showTitle)}
            />
          </span>
          {showTitle && (
            <p className="text-[8px] absolute top-[-15px]">
              Password should be minimum of 8 length, atleast one number.
            </p>
          )}
        </div>
        <PasswordInput
          title="Enter New Password"
          errorMessage={formik.errors.password}
          name="password"
          inputValue={formik.values.password}
          onHandleChange={onhandleChange}
          touched={formik.touched.password}
        />
        <PasswordInput
          title="Re-enter New Password"
          errorMessage={formik.errors.confirmPassword}
          name="confirmPassword"
          inputValue={formik.values.confirmPassword}
          onHandleChange={onhandleChange}
          touched={formik.touched.confirmPassword}
          disabled={
            formik.values.password === "" ||
            !validatePassword(formik.values.password)
          }
        />
        <div className="w-full flex gap-0.5 flex-col">
          <Button2
            title="Confirm"
            disabled={
              formik.values.password === "" ||
              formik.values.confirmPassword === "" ||
              !validatePassword(formik.values.confirmPassword) ||
              formik.values.password !== formik.values.confirmPassword
            }
            onClick={formik.handleSubmit}
          />
          <Button title="Cancel" onClick={() => navigate("/auth/login")} />
          {loading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default NewPassword;
