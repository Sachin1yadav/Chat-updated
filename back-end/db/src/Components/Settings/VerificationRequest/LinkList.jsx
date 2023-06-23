import React from "react";
import Input from "../../Login/Content/InputBox/Input";

const LinkList = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((elem, index) => (
        <Input key={index} title={`Link ${index + 1}`} />
      ))}
    </>
  );
};

export default LinkList;
