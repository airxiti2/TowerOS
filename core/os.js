setInterval(function () {
  document.querySelector("#app_bar_time").innerHTML =
    new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
}, 1000);

dragElement(document.getElementById("window_metar"));
dragElement(document.getElementById("window_radar"));

function dragElement(element) {
  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;

  if (document.getElementById(element.id + "_header")) {
    document.getElementById(element.id + "_header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();

    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = element.offsetTop - currentY + "px";
    element.style.left = element.offsetLeft - currentX + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "";
}

let metarScreenClose = document.querySelector("#metar_close");
let metarScreenOpen = document.querySelector("#metar_open");

let radarScreenClose = document.querySelector("#radar_close");
let radarScreenOpen = document.querySelector("#radar_open");

metarScreenClose.addEventListener("click", function () {
  closeWindow(window_metar);
});

metarScreenOpen.addEventListener("click", function () {
  openWindow(window_metar);
});

radarScreenClose.addEventListener("click", function () {
  closeWindow(window_radar);
});

radarScreenOpen.addEventListener("click", function () {
  openWindow(window_radar);
});

let metarApp = document.querySelector("#metar_app");
let radarApp = document.querySelector("#radar_app");

metarApp.addEventListener("click", function () {
  handleIconTap(metar_app);
});

radarApp.addEventListener("click", function () {
  handleIconTap(radar_app);
});

let selectedIcon;

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined;
}

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(globalThis);
  } else {
    selectIcon(element);
  }
}

let windowMetar = document.querySelector("#window_metar");
let windowRadar = document.querySelector("#window_radar");

metarApp.addEventListener("click", function (e) {
  e.stopPropagation();
  selectIcon(metarApp);
});

metarApp.addEventListener("dblclick", function () {
  openWindow(window_metar);
});

radarApp.addEventListener("click", function (e) {
  e.stopPropagation();
  selectIcon(radarApp);
});

radarApp.addEventListener("dblclick", function () {
  openWindow(window_radar);
});

document.addEventListener("click", function () {
  if (selectedIcon) {
    deselectIcon(selectedIcon);
  }
});

makeResizable(document.getElementById("window_metar"));
makeResizable(document.getElementById("window_radar"));

function makeResizable(element) {
  const resizer = element.querySelector(".resizer");
  if (!resizer) return;

  resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    element.classList.add("resize-active");

    globalThis.addEventListener("mousemove", startResizing);
    globalThis.addEventListener("mouseup", stopResizing);
  });

  function startResizing(e) {
    const rect = element.getBoundingClientRect();

    const newWidth = e.clientX - rect.left;
    const newHeight = e.clientY - rect.top;

    element.style.width = newWidth + "px";
    element.style.height = newHeight + "px";
  }

  function stopResizing() {
    globalThis.removeEventListener("mousemove", startResizing);
    globalThis.removeEventListener("mouseup", stopResizing);
    
    element.classList.remove("resize-active");
  }
}
