importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAcJzppx6PHvFiGQlP3HXcC21cgDATqAoE",

  authDomain: "uynite-inc.firebaseapp.com",

  projectId: "uynite-inc",

  storageBucket: "uynite-inc.appspot.com",

  messagingSenderId: "48084742080",

  appId: "1:48084742080:web:499527de558e0e3e08e225",

  measurementId: "G-2WD1HF0SLM",
};

// const firebaseConfig = {​​
//   apiKey: "AIzaSyAcJzppx6PHvFiGQlP3HXcC21cgDATqAoE",
//   authDomain: "uynite-inc.firebaseapp.com",
//   databaseURL: "https://uynite-inc-default-rtdb.firebaseio.com",
//   projectId: "uynite-inc",
//   storageBucket: "uynite-inc.appspot.com",
//   messagingSenderId: "48084742080",
//   appId: "1:48084742080:web:499527de558e0e3e08e225",
//   measurementId: "G-2WD1HF0SLM"
// }​​;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ");
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// const addResourcesToCache = async (resources) => {
//   const cache = await caches.open("SH-V1");
//   await cache.addAll(resources);
// };
// /* eslint-disable-next-line no-restricted-globals */
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     addResourcesToCache([
//       "/",
//       "/index.html",
//       "/static/js/bundle.js"
//     ])
//   );
// });
