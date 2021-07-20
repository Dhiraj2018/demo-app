// console.log("Service Worker Loaded...");

// self.addEventListener("push", e => {
//   const data = e.data.json();
//   console.log("Push Recieved...");
//   self.registration.showNotification(data.title, {
//     body: "Order prepared",
//     icon: "https://icon-library.com/images/cafe-icon/cafe-icon-9.jpg"
//   });
// });

self.addEventListener('push', () => {
    self.registration.showNotification('Hello world!');
  });