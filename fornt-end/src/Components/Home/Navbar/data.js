import chatIcon from "../../../Assets/Images/chatIcons.png"
import friendsIcons from "../../../Assets/Images/friendsIcons.png";
import notificationIcons from "../../../Assets/Images/notificationIcons.png";


;

export const dataList = [
  {
    name: "Roots",
    title: "Connect Friends",
    iconBefore: "./images/rootsBefore.png",
    afterIcon: "./images/rootsSelected.png",
    color: "#6780AF",
    url: "root",
  },

  {
    name: "Kicks",
    title: "Short Videos",
    iconBefore: "./images/kicksUnselected.png",
    afterIcon: "./images/kicksSelected.png",
    color: "#DD8E58",
    url: "kicks",
  },
  {
    name: "Reals",
    title: "Create Map",
    iconBefore: "./images/realsBefore.png",
    afterIcon: "./images/realsSelected.png",
    color: "#F40229",
    url: "reals",
  },
  {
    name: "U-Meet",
    title: "Create Events",
    iconBefore: "./images/umeetUnselected.png",
    afterIcon: "./images/umeetSelected.png",
    color: "#649B8E",
    url: "umeet",
  },
];
export const data = [
  {
    name: "Chat",
    icon: chatIcon,
    url: "/chat-page",
  },
  {
    name: "Friends",
    icon: friendsIcons,
    url: null,
  },
  {
    name: "Notifications",
    icon: notificationIcons,
    url: null,
  },
];
