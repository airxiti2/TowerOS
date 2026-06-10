setInterval(function () {
  document.querySelector("#app_bar_time").innerHTML =
    new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
}, 1000);
