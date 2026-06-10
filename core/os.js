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

async function fetchVatsimMetar(icao) {
  try {
    const url = `https://metar.vatsim.net/${icao.toUpperCase()}?format=json`;
    const response = await fetch(url);
    const data = await response.json();
    const metarResponse = document.querySelector("#metar_response");
    console.log(data);
    metarResponse.textContent = data[0].id + " " + data[0].metar;
  } catch (error) {
    console.error("Error while fetching METAR data for" + icao + ": " + error);
  }
}

const metarButton = document.querySelector("#metar_submit");
const metarInput = document.querySelector("#metar_input");

metarButton.addEventListener("click", function () {
  const icaoCode = metarInput.value;
  if (icaoCode.trim() !== "") {
    fetchVatsimMetar(icaoCode);
  }
});

let windowMetar = document.querySelector("#window_metar");
let windowRadar = document.querySelector("#window_radar");

metarApp.addEventListener("click", function (e) {
  e.stopPropagation(); // Verhindert, dass der Klick sofort den Desktop trifft
  selectIcon(metarApp);
});

metarApp.addEventListener("dblclick", function () {
  openWindow(window_metar); // Öffnet das Fenster bei Doppelklick
});

// 4. Event Listener für das RADAR-Icon
radarApp.addEventListener("click", function (e) {
  e.stopPropagation(); // Verhindert, dass der Klick sofort den Desktop trifft
  selectIcon(radarApp);
});

radarApp.addEventListener("dblclick", function () {
  openWindow(window_radar); // Öffnet das Fenster bei Doppelklick
});

// 5. Klick auf den Desktop hebt die Auswahl auf
document.addEventListener("click", function () {
  if (selectedIcon) {
    deselectIcon(selectedIcon);
  }
});
