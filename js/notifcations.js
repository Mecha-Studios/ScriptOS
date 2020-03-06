const img = "images/Script-OS-3.png";
const text = "This is a test of Script OS notifications";
const title = "test";
const options = {
    body: text,
    icon: "images/Script-OS-3.png",
    tag: "test",
    image: img,
    badge: "https://spyna.it/icons/android-icon-192x192.png",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
 };

navigator.serviceWorker.ready.then(function(serviceWorker) {
  serviceWorker.showNotification(title, options);
});