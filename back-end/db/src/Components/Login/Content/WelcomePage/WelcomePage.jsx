import React from 'react'
import { Link } from "react-router-dom"; // import the Link component
import Input from "../InputBox/Input";
import Heading from "../Heading/Heading";
import PasswordInput from "../InputBox/PasswordInput";
import Button2 from "../Button/Button2";
import { useFormik } from "formik";
import * as Yup from "yup";
// import Logo from "./Logo.png"


const WelcomePage = () => {
 
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('"Email address incorrect. Please Try again"')
          .required("Required"),
        password: Yup.string()
          .min(
            8,
            "Password should be minimum of 8 length characters with one numerical value"
          )
          .matches(passwordRules, {
            message:
              "min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit",
          })
          .required("Required"),
      }),
      onSubmit: (e) => {
        e.preventDefault();
        const dataObj = {
          email: formik.values.email,
          password: formik.values.password,
        };
        console.log("dataObj", dataObj);
      },
    });
  
    return (
      <>
        <form
          className="w-full h-[90%] rounded-[20px] flex flex-col justify-center items-center gap-2 p-4"
          onSubmit={formik.handleSubmit}
        >
       
        {/* <img src={Logo} alt="" className=' w-[25%]' /> */}
       
          <Input
            title="Email or Phone"
            name="email"
            inputValue={formik.values.email}
            errorMessage={formik.errors.email}
            touched={formik.touched.email}
            onHandleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full"
          />
          <PasswordInput
            title="Password"
            name="password"
            inputValue={formik.values.password}
            onHandleChange={formik.handleChange}
            errorMessage={formik.errors.password}
            touched={formik.touched.password}
            onBlur={formik.handleBlur}
            className="w-full"
          />
          <div className="w-full">
            <Link to="/auth/forgetpassword" className="text-xs font-bold mb-2">
              Forget Password ?
            </Link>
          </div>
          <Button2 title="Sign In" className="w-full" />
          <p className="text-xs font-bold text-[#7B8FA1] mt-4">
            Don't have an account?
            <Link to="/auth/signup" className="text-[#7991BD] ml-2">
              Sign Up
            </Link>
          </p>
        </form>
      </>
    );

}

export default WelcomePage;
