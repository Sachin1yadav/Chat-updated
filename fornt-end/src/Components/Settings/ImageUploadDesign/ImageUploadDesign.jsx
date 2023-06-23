import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";

const ImageUploadDesign = ({ title, handleImageChange, file }) => {
  return (
    <div className="w-full">
      <p className="text-sm my-2">{title}</p>

      <label
        className="font-medium w-full mb-1 h-[40vh] flex flex-col items-center justify-center border border-gray-400 rounded-lg"
        htmlFor="image"
      >
        {!file ? (
          <>
            <ImageIcon
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: "",
              }}
              className="text-[#7991BD]"
            />
            <h1 className="font-semibold">Add Image</h1>
            <input
              className="border border-gray-400 rounded hidden absolute"
              type="file"
              id="image"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </>
        ) : (
          <img
              src={URL.createObjectURL(file)}
            alt="image"
            className="h-full w-full object-fit rounded-lg"
          />
        )}
      </label>
    </div>
  );
};

export default ImageUploadDesign;
