import React from 'react'
import Input from '../../input/input'
import Dropdown from '../../Login/Content/Modal/Dropdown'
import { useSelector } from 'react-redux'
import DropdownComp from '../../common/DropdownComp'

const OrganizationAccount = ({ handleChange, orgDetail, states }) => {
  const reducerData = useSelector((state) => {
    return {
      orgCategory: state.userReducer.orgCategory
    }
  })
  const { orgCategory } = reducerData;
  const { org, website, fname, address, intro, orgname, businesscategory, email, others_address, others_website,
  orgemail } = orgDetail;

  return (
    <div>
      <div className="mb-6 text-white ps-4 py-2 mt-6 text-[20px] bg-[#7991bd]">
        Professional Info
      </div>
      <Input
        classes={"flex"}
        label={"Organization Name"}
        attributes={{
          name: "fname",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          placeholder: "Organization Name",
          value: fname,
        }}
      />
      <DropdownComp
        options={orgCategory}
        keyName={"category"}
        label={"Organization Type"}
        name={"Organization Type"}
        style={"w-[74%] my-2"}
        selectedValue={{category: businesscategory}}
        handleChange={(value) =>
          handleChange("businesscategory", value.category)
        }
      />
      <Input
        attributes={{
          name: "others_website",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          placeholder: "website",
          value: others_website,
        }}
        classes={"flex"}
        label={"Website"}
      />

      <Input
        attributes={{
          name: "orgemail",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          placeholder: "Email",
          value: orgemail,
        }}
        classes={"flex"}
        label={"Email"}
      />
      <Input
        classes={"flex my-2"}
        attributes={{
          name: "others_address",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          placeholder: "Address",
          value: others_address,
        }}
        label={"Address"}
      />

      {/* <Input
        classes={"my-2"}
        attributes={{
          type: "textarea",
          col: 4,
          placeholder: "Write your intro...",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          name: "intro",
          value: intro,
        }}
      /> */}
      <textarea
      className='w-full p-2 rounded-md'
      placeholder='Write your intro...'
      name='intro'
      value={intro}
      onChange={(e) => handleChange(e.target.name, e.target.value)}
      rows={4}
      >

      </textarea>
    </div>
  );
}

export default OrganizationAccount