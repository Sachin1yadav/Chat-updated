export const userData=[]
export const ownPostOption = [
  {
    samePostedUser: 0,
    name: "Edit Post",
    icon: "./images/edit.png",
  },
  {
    samePostedUser: 1,
    name: "History",
    icon: "./images/history.png",
    key: 'Others'
  },
  {
    samePostedUser: 1,
    name: "External Share",
    icon: "./images/externalShare.png",
    key: 'others'
  },
  {
    samePostedUser: 0,
    name: "Delete Post",
    icon: "./images/Delete.png",
  },
  {
    samePostedUser: 0,
    name: "Mute/Unmute Notifications",
    icon: "./images/mute.png",
    key: 'others'
  },  
  {
    samePostedUser: 0,
    name: "Turn off/on Commeting",
    icon: "./images/Messages.png",
  }, 
];

export const otherPostOption =[
  {
    samePostedUser: 1,
    name: "History",
    icon: "./images/history.png",
    key: 'Others'
  },
  {
    samePostedUser: 1,
    name: "External Share",
    icon: "./images/externalShare.png",
    key: 'others'
  },
  {
    samePostedUser: 2,
    name: "Report",
    icon: "./images/Report.png",
    key: 'others'
  },
  {
    samePostedUser: 2,
    name: "Block user",
    icon: "./images/blockuser.png",
    key: 'others'
  },
]

const postData = [
  {
    userId: 1,
    userIcon: "./images/event.jpg",
  },
  {
    userId: 1,
    userIcon: "./images/event.png",
  },
  {
    userId: 3,
    userIcon: "./images/groups.jpg",
  },
  {
    userId: 2,
    userIcon: "./images/pizza.jpg",
  },
  {
    userId: 4,
    userIcon: "./images/Report.png",
  },
  {
    userId: 1,
    userIcon: "./images/joker.jpg",
  },
];

export default postData;
