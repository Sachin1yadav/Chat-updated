import React from "react";
import { AiTwotoneSound } from "react-icons/ai";
import {
  MdDirectionsWalk,
  MdOutlineMarkEmailUnread,
  MdWorkOutline,
} from "react-icons/md";
import { BsPhone, BsCalendarEvent } from "react-icons/bs";
import { CgOrganisation, CgProfile } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import { TbBrandRedhat } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";

const AboutSection = ({ isOther, data }) => {
  const navigate = useNavigate();
  const {
    fname, lname,
    countrycode,
    mobile,
    country,
    state,
    loksabha,
    city,
    assembly,
    hometown,
    profiletype,
    orgname,
    businesscategory,
    createdate,
    orgemail,
    orgmobile, others_address, personalname, personalLastName, others_website
  } = data || {};
  const reducerData = useSelector((state) => {
    return {
      educationDetails: state.profileReducer.educationDetails || {}
    }
  });
  const { educationDetails } = reducerData;
  const {
    schoolpass,
    schooladdress,
    schoolname,
    ugbranch,
    ugdegree,
    collagenameug,
    ugaddress,
    ugpassyear,
    pgpassyear,
    pgbranch,
    pgdegree,
    pgaddress,
    collagenamepg,
  } = educationDetails;
  const isPersonal = profiletype === "Personal";
  return (
    <div className="sm:mb-[80px] lg:mb-[60px] w-[95%] lg:w-[80%] xl:w-[70%] bg-white rounded-xl flex flex-col items-center ">
      {/*Head Section */}
      <section className="flex w-full justify-between my-2 px-4">
        <strong className="text-lg font-medium">About</strong>
        {!isOther && (
          <button
            onClick={() => navigate("/edit-profile")}
            className="text-md font-bold rounded-lg flex items-center text-white bg-[#6780AF] px-[10px] text-[12px]"
          >
            Edit Profile
          </button>
        )}
      </section>
      {/* <div className="w-[93%] h-0.5 bg-gray-500"></div> */}

      {/* Details Section */}
      <Typography className="text-lg w-full py-1 px-4 bg-gray-300  font-[800]">Personal Info</Typography>
      <section className="flex flex-col w-full my-4 gap-2">
          {
            !isPersonal &&
            <div className="items-center gap-2 px-4">
              <p className="text-sm w-full">
                <strong className="text-md font-medium w-1/2 inline-block">Full Name</strong>
                <strong>: {
                  `${personalname || ""} ${personalLastName || ""}`
                } </strong>
              </p>
            </div>
          }
        {/* DOB Section */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md inline-block font-medium w-1/2">Date of Birth</strong>
            <strong>: {moment(data?.dob).format("MMM-DD-YYYY")}</strong>
          </p>
        </div>

        {/* Gender Section */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md inline-block font-medium w-1/2">Gender</strong>
            <strong>: {data?.gender}</strong>
          </p>
        </div>

        {/* Phone Number Section */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">Phone </strong>
            :<strong className="text-[#05b7fd]"> {`${"" || ""} ${mobile || ""}`}</strong>
          </p>
        </div>

        {/* Email Section */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">Email</strong>
            :<strong className="text-[#05b7fd]"> {data?.email}</strong>
          </p>
        </div>

        {/* Location Section */}
        {/* <strong className="text-lg font-[800]">Location :</strong> */}

        <Typography className="text-lg w-full py-1 px-4 bg-gray-300  font-[800]">Location</Typography>

        {/* Living Location */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">Living Location</strong>
            <strong>: {`${city ? `${city} ` : ""}`} </strong>
          </p>
        </div>

        {/*Assembly Section */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">Assembly </strong>
            <strong>: {`${assembly ? `${assembly} ` : ""}`} </strong>
          </p>
        </div>

        {/*LokSabha Section */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">Loksabha</strong>
            <strong>: {`${loksabha ? `${loksabha} ` : ""}`} </strong>
          </p>
        </div>

        {/*Distric Section */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">District</strong>
            <strong>: {`${"" ? `${""} ` : ""}`} </strong>
          </p>
        </div>

        {/*State Section */}
        <div className="flex items-center gap-2 px-4">

          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">State</strong>
            <strong>: {`${state ? `${state} ` : ""}`} </strong>
          </p>
        </div>
        {/*District Section */}
        {/* <div className="flex items-center gap-2">
          <div className="w-7">
            <GoLocation alt="" className="w-6 h-6 text-[#6c6c6c]" />
          </div>
          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/3 inline-block">District : </strong>
            <strong> {`${city ? `${city} ` : ""}`} </strong>
          </p>
        </div> */}

        {/*Country Section */}
        <div className="flex items-center gap-2 px-4">
          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">Country</strong>
            <strong>: {`${country ? `${country} ` : ""}`} </strong>
          </p>
        </div>

        {/*Profession Section */}
        {/* <Typography className="text-lg w-full py-1 px-4 bg-gray-300  font-[800]">Profession</Typography>

        <div className="flex items-center gap-2 px-4">
          <p className="text-sm w-full">
            <strong className="text-md font-medium w-1/2 inline-block">Company</strong>
          </p>
        </div> */}
        {isPersonal ? (
          <>
            <Typography className="text-lg w-full py-1 px-4 bg-gray-300  font-[800]">Education Details</Typography>
            <div className="px-4 font-bold text-gray-500">School</div>
            {/* Scholling Section */}
            {schooladdress || schoolname ? (
              <div className="flex items-center gap-2 px-4">
                <p className="text-sm">
                  Completed schooling from
                  <strong>
                    {" "}
                    {schoolname}, {schooladdress}
                  </strong>{" "}
                  in the year
                  <strong> {schoolpass}</strong>.
                </p>
              </div>
            ) : (
              ""
            )}
            {/* Graduation Section */}
            {collagenameug || ugaddress ? (
              <>
                <div className="px-4 font-bold text-gray-500">Graduation</div>
                <div className="flex items-center gap-2 px-4">
                  <p className="text-sm">
                    <strong> {ugdegree} </strong>
                    {
                      ugaddress ?
                        <>form <strong>{ugaddress} </strong></>
                        : ""
                    }
                    {
                      ugpassyear ?
                        <>in the year <strong>{ugpassyear} -  </strong></>
                        : ""
                    }
                    <strong> <br />
                      {ugbranch}
                    </strong>
                  </p>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Graduation Section */}
            {collagenamepg || pgaddress || pgdegree || pgbranch ? (
              <>
                <div className="px-4 text-gray-500 font-weight">Post Graduation</div>
                <div className="flex items-center gap-2 px-4">
                  <p className="text-sm">
                    <strong> {pgdegree} </strong>
                    {
                      pgaddress ?
                        <>form <strong>{pgaddress} </strong>
                        </> : ""
                    }
                    {
                      pgpassyear ?
                        <>in the year <strong>{pgpassyear} -  </strong></>
                        : ""
                    }
                    <strong> <br />
                      {pgbranch}
                    </strong>
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Typography className="text-lg w-full py-1 px-4 bg-gray-300  font-[800]">Professional Info</Typography>
            <p className="text-sm w-full px-4">
              <strong className="text-md font-medium w-1/2 inline-block">Organization Name</strong>
              <strong>: {fname} </strong>
            </p>
            <div className="items-center gap-2 px-4">
              <p className="text-sm w-full">
                <strong className="text-md font-medium w-1/2 inline-block">Organization Category</strong>
                <strong>: {businesscategory} </strong>
              </p>
            </div>

            <div className="items-center gap-2 px-4">
              <p className="text-sm w-full">
                <strong className="text-md font-medium w-1/2 inline-block">Website</strong>
                <strong>: {others_website}  </strong>
              </p>
            </div>

            <div className="items-center gap-2 px-4">
              <p className="text-sm w-full">
                <strong className="text-md font-medium w-1/2 inline-block">Email</strong>
                <strong>: {orgemail} </strong>
              </p>
            </div>

            <div className="items-center gap-2 px-4">
              <p className="text-sm w-full">
                <strong className="text-md font-medium w-1/2 inline-block">Phone</strong>
                <strong>: {
                  orgmobile
                } </strong>
              </p>
            </div>

            
            <div className="items-center gap-2 px-4">
              <p className="text-sm w-full">
                <strong className="text-md font-medium w-1/2 inline-block">Address</strong>
                <strong>: {
                  others_address
                } </strong>
              </p>
            </div>
          </>
        )}
      </section>
      <p className="mb-4 text-sm">
        <strong>Uynited</strong> on <strong>{moment(createdate, 'x').format('DD MMMM, YYYY')}</strong>
      </p>
    </div>
  );
};

export default AboutSection;
