import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import user from "../../../Assets/Images/user.png";
import { useSelector } from "react-redux";
import ProfileFooter from "../Modal/ProfileModal/ProfileFooter";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { BsChevronCompactDown } from "react-icons/bs";

export default function ProfileMenu({}) {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profileReducer);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };
  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt=""
          className="cursor-pointer rounded-full w-[28px] h-[28px] lg:w-[30px] lg:h-[30px]"
          src={profile?.pimage || user}
        />
      </MenuHandler>
      {/* <BsChevronCompactDown className="" size={22} /> */}
      <MenuList className="w-fit max-w-[300px]">
        <MenuItem
          onClick={() => navigate("/profile")}
          className="flex items-center mb-1"
        >
          <Typography
            variant="small"
            className="flex gap-3 items-center font-bold"
          >
            <Avatar className="rounded-full" src={profile?.pimage || user} />
            <Typography>
              {profile?.fname || ""} {profile?.lname || ""}
            </Typography>
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/events-result")}
          className="flex justify-between items-center mb-1 gap-2"
        >
          <Typography variant="small" className="font-bold">
            Sponsored event results
          </Typography>
          <MdArrowForwardIos className="w-5 text-gray-500" />
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/unions")}
          className="flex justify-between items-center mb-1 gap-2"
        >
          <Typography variant="small" className="font-bold">
            Unions's
          </Typography>
          <MdArrowForwardIos className="w-5 text-gray-500" />
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/settings")}
          className="flex justify-between items-center mb-1 gap-2"
        >
          <Typography variant="small" className="font-bold">
            Settings
          </Typography>
          <MdArrowForwardIos className="w-5 text-gray-500" />
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/contact-us")}
          className="flex justify-between items-center mb-1 gap-2"
        >
          <Typography variant="small" className="font-bold">
            Contact Us
          </Typography>
          <MdArrowForwardIos className="w-5 text-gray-500" />
        </MenuItem>

        {/* <hr className="mb-1 border-blue-gray-50" /> */}
        <MenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 mb-1 "
        >
          <Typography variant="small" className="font-bold">
            Log Out
          </Typography>
        </MenuItem>

        <MenuItem className="flex items-center  ">
          <Typography variant="small" className="font-bold">
            <ProfileFooter />
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
