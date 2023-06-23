import React, { useEffect } from "react";
import dotenv from "dotenv";

const Footer = () => {
  // dotenv.config();
  // useEffect(() => {
  //   loadTranslateAPI();
  // }, []);

  // async function loadTranslateAPI() {
  //   try {
  //     if (typeof window !== "undefined") {
  //       const google = await import("googleapis").then(
  //         (module) => module.google
  //       );
  //       const auth = await google.auth.getClient({
  //         keyFilename: process.env.REACT_APP_SERVICE_ACCOUNT_KEY,
  //         scopes: ["https://www.googleapis.com/auth/cloud-translation"],
  //       });
  //       const translate = google.translate({ version: "v2", auth });
  //       // Now you can use the 'translate' object to make translation requests
  //       // For example: translate.translate(...)
  //     }
  //   } catch (error) {
  //     console.error("Error loading Google Translate API:", error);
  //   }
  // }

  // async function translateText() {
  //   try {
  //     if (typeof window !== "undefined") {
  //       const google = await import("googleapis").then(
  //         (module) => module.google
  //       );
  //       const auth = await google.auth.getClient({
  //         keyFilename: process.env.REACT_APP_SERVICE_ACCOUNT_KEY,
  //         scopes: ["https://www.googleapis.com/auth/cloud-translation"],
  //       });
  //       const translate = google.translate({ version: "v2", auth });

  //       const response = await translate.translate({
  //         q: "Hello world",
  //         target: "fr",
  //       });
  //       console.log(
  //         "Translation:",
  //         response.data.translations[0].translatedText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Translation error:", error);
  //   }
  // }

  return (
    <div className="flex flex-col h-[90px] justify-center mt-[15px] bg-[#cdd6e8]">
      <div className="flex gap-8 justify-center items-center w-[18%] mb-2">
        <select
          name=""
          id=""
          className="font-semibold text-xs bg-[#CDD6E8] outline-none ml-3 text-[#6F6F6F]"
          // onClick={translateText}
        >
          <option value="english">English</option>
          <option value="english">Hindi</option>
          <option value="english">French</option>
        </select>
      </div>
      <div className="flex flex-wrap w-[60%] justify-center items-center gap-1">
        <div className="font-semibold text-xs text-[#6F6F6F] mr-4">
          <span>&copy;</span> 2022 Uynite.com
        </div>
        <span className="font-semibold text-[#6F6F6F] text-xs">About us</span>
        <div className="bg-[#6F6F6F]  w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-semibold text-[#6F6F6F] text-xs">
          Privacy & Cookies
        </span>
        <div className="bg-[#6F6F6F] w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-semibold text-[#6F6F6F] text-xs">
          Terms & Conditions
        </span>
        <div className="bg-[#6F6F6F]  w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-semibold text-[#6F6F6F] text-xs">Services</span>
        <div className="bg-[#6F6F6F]  w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-semibold text-[#6F6F6F] text-xs">Careers</span>
        <div className="bg-[#6F6F6F]  w-[2px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-semibold text-[#6F6F6F] text-xs">Help</span>
      </div>
    </div>
  );
};

export default Footer;
