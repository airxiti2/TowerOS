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
