import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmailToList, allEmailInvites } from "../../../../../redux/actionCreators/umeetActionCreator";

export default function PoliticalAddBy({ onClose, whichBy, selectBy }) {
  const dispatch = useDispatch();
  const [addByMail, setAddByMail] = useState(false);

  const [addEmail, setAddEmail] = useState("");

  const { emailList } = useSelector((state) => state.umeetReducer);
  const onHandleEmailChange = (event) => {
    setAddEmail(event.target.value);
  };

  const onHandleAddEmail = () => {
    const emailData = {
      umail: addEmail,
      eventname: "event",
    };
    dispatch(addEmailToList(emailData));
    setAddEmail("")
    console.log("emailData", emailData);
  };

  const onAddInvitesClick = () => {
    if (addByMail) {
      dispatch(allEmailInvites(emailData));
    }
  };
  return (
    <section className="h-full">
      <div className="flex justify-between font-semibold my-1">
        <span
          onClick={() => setAddByMail(false)}
          className={`${
            addByMail ? "border text-[#649b8e]" : "bg-[#649b8e] text-white"
          } cursor-pointer flex justify-center rounded-lg mx-1 w-1/2 px-1 border-[#649b8e] py-1`}
        >
          Add By {whichBy}
        </span>
        <span
          onClick={() => setAddByMail(true)}
          className={`${
            addByMail ? "bg-[#649b8e] text-white" : ""
          } border text-[#649b8e] w-1/2 cursor-pointer flex justify-center rounded-lg mx-1 border-[#649b8e] px-1 py-1`}
        >
          Add By Phone/Email
        </span>
      </div>

      {addByMail ? (
        <section className="h-[52%] lg:h-[61%] 2xl:h-[63%]">
          <div className="flex items-center my-3">
            <input
              value={addEmail}
              type="email"
              onChange={onHandleEmailChange}
              className="w-full outline-none bg-gray-200 border border-gray-200 rounded-lg h-9 pl-1"
              placeholder="Entre Email Address"
            />
            <button
              className="px-4 py-1.5 text-sm rounded-md text-white ml-1 border bg-[#649B8E]"
              onClick={onHandleAddEmail}
            >
              Add
            </button>
          </div>

          <div className='flex items-center pb-3 border-b border-gray-300'>  
           <select className='bg-gray-200 mr-2 outline-none h-9 rounded-lg px-2 border border-gray-200'>          
            <option>+91</option>
            <option>USA</option>
           </select>      
          <input className='w-full outline-none bg-gray-200 border border-gray-200 rounded-lg h-9 pl-1' placeholder='9879867543' />
          <button className='px-4 py-1.5 text-sm rounded-md text-white ml-1 border bg-[#649B8E]'>Add</button>
         </div>

          {emailList?.map((email) => (
            <div>{email?.umail}</div>
          ))}
        </section>
      ) : (
        <>
          <input
            type="search"
            className="outline-none border-b border-[#519d8b] text-[#519d8b] w-full my-2"
            placeholder="Search.."
          />

          <div className="flex items-center">
            <input type="checkbox" id="selectAll" className="w-5 h-5" />
            <label
              htmlFor="selectAll"
              className="ml-5 text-[17px] text-gray-700"
            >
              Select All
            </label>
          </div>

          <div className="h-[41%] lg:h-[49%] 2xl:h-[53%] overflow-y-scroll">
            {selectBy?.map((data, i) => (
              <div key={i} className="flex items-center my-2.5">
                <input
                  value={data?.state}
                  type="checkbox"
                  id={data?.state}
                  className="w-5 h-5"
                />
                <label
                  htmlFor={data}
                  className="ml-5 text-[17px] text-gray-700"
                >
                  {data?.state}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="flex mx-6 my-2">
        <button className="py-2 bg-[#649b8e] m-1 font-semibold text-white rounded-lg w-full" onClick={onAddInvitesClick}>
          Add Invities
        </button>
        <button
          onClick={onClose}
          className="py-2 border border-[#649b8e] m-1 font-semibold rounded-lg w-full"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
