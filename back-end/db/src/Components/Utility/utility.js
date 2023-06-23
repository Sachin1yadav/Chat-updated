import { toast } from "react-toastify";
import globe from '../../Assets/Images/globe.png';
import home from '../../Assets/Images/home.png';
import friend from '../../Assets/Images/friendsIcon.png';
import union from '../../Assets/Images/unionIcon.png';
import books from '../../Assets/Images/books.png';
import person from '../../Assets/Images/personIcon.png'
// import relative from '../'
import moment from "moment";

// Showing Toast Message
export const toasterFunction = (message) => {
  toast(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const getQueryParams = (data) => {
  const ret = [];
  for (let d in data) {
    if ((typeof (data[d]) === 'object' && data[d] !== null) || Array.isArray(data[d])) {
      for (let arrD in data[d]) {
        ret.push(
          `${encodeURIComponent(d)}[]=${encodeURIComponent(data[d][arrD])}`
        );
      }
    } else if (null === (data[d]) || undefined === (data[d])) {
      ret.push(encodeURIComponent(d));
    } else {
      ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
    }
  }
  return ret.join("&");
};

// Get Data from Local Storage
export const setDataOnStorage = (value, name = "userCredential") => {
  value.token && localStorage.setItem('token', value.token)
  return localStorage.setItem(name, JSON.stringify(value));
};

// Get Data from Local Storage
export const getUserDataFromLocalStorage = () => {
  let userData = localStorage.getItem("userCredential");
  userData = JSON.parse(userData)
  return userData
};

export const isEmpty = (data) => {
  if(Array.isArray(data)){
     return data.length === 0
  } else if(typeof data === 'object' && data !== null){
    return Object.getOwnPropertyNames(data).length === 0
  } else return true;
}

export function debounce(func, timeout = 1200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}


export const getPrivacy = (relation) => {
  const obj = {
    Public: globe,
    Relatives: home,
    Friends: friend,
    Classmates: books,
    Officemates: person,
  }
  return obj[relation] || union
}

export const getTimeDiff = (startDate, endDate = new Date().getTime()) => {
    let moment1 = moment(startDate);
    let moment2 = moment(endDate);
    let duration = moment.duration(moment1.diff(moment2));
    return duration.humanize()
}