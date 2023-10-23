function showInfo() {
  const quoteCont = document.getElementById("quote__container");
  const moreBtnText = document.getElementById("btn_text");
  const moreBtnSvg = document.getElementById("btn_svg");
  const timeCont = document.getElementById("timeData");
  const infoCont = document.getElementById("info__container");
  if (moreBtnText.textContent === "MORE") {
    moreBtnText.textContent = "LESS";
    moreBtnSvg.src = "./assets/desktop/icon-arrow-up.svg";
    timeCont.style = "margin-top:0;";
    quoteCont.style = "display:none;";
    infoCont.style = "display:flex;";
  } else if (moreBtnText.textContent === "LESS") {
    moreBtnText.textContent = "MORE";
    moreBtnSvg.src = "./assets/desktop/icon-arrow-down.svg";
    timeCont.style = "margin-top:0;";
    quoteCont.style = "display:block;";
    infoCont.style = "display:none;";
  }
}

function updateTime(lat, long) {
    // Replace with your latitude and longitude
    const latitude = lat;
    const longitude = long;
    const bstBsr = document.getElementById("bstBsr")
    const bckimg = document.getElementById("main__container")


    // Define the URL for the Sunset and Sunrise API
    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`;

    // Fetch sunset and sunrise time data
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Extract the sunset and sunrise times from the API response
            const sunsetTime = data.results.sunset;
            console.log(data)

            // Get the current time
            const currentTime = new Date();
            if (currentTime > new Date(sunsetTime)) {
                // The sun has already set, so calculate time until sunrise
                const message = "BSR";
                bstBsr.textContent = message
            } else {
                // Calculate time until sunset
                const message = "BSD";
                bstBsr.textContent = message
            }
        })
        .catch((error) => {
            console.error("Failed to fetch sunset and sunrise data:", error);
        });
}


async function updateQuote() {
  // Fetch a random quote from the Quotable API
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  console.log(data);
  const quoteBody = document.getElementById("quote");
  const quoteauthor = document.getElementById("quoteauthor");
  if (response.ok) {
    // Update DOM elements
    quoteBody.textContent = data.content;
    quoteauthor.textContent = data["author"];
  } else {
    quote.textContent = "An error occured";
    console.log(data);
  }
}

async function updateTimezone() {
  const weekday = document.getElementById("dayOfWeek");
  const yearday = document.getElementById("dayOfYear");
  const weeknum = document.getElementById("weekNum");
  const timezone = document.getElementById("timeZone");

  const apiUrl = "http://worldtimeapi.org/api/ip";

  // Use the fetch API to make a GET request to the API
  fetch(apiUrl)
    .then((response) => {
      // Check if the response status is OK (200)
      if (response.status === 200) {
        // Parse the JSON response
        return response.json();
      } else {
        throw new Error("Failed to fetch data from the API");
      }
    })
    .then((data) => {
      // Data contains the information from the API
      console.log(data);
      weekday.textContent = data["day_of_week"];
      yearday.textContent = data["day_of_year"];
      weeknum.textContent = data["week_number"];
      timezone.textContent = data["timezone"];
      // You can access specific properties like data.datetime, data.timezone, etc.
    })
    .catch((error) => {
      console.error(error);
    });
}

async function getLatLong() {
    // Define your API key (sign up for a free API key at https://ipgeolocation.io/)
    const apiKey = '9ac0e342ee9b437b9e3f4891bd347769';
    const location = document.getElementById("location")
    // Define the API endpoint
    const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

    try {
        // Fetch location data and wait for the response
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch location data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        const latitude = data.latitude;
        const longitude = data.longitude;
        location.textContent = `IN ${data.country_capital}, ${data.country_code2}`
        // Display the latitude and longitude
        console.log(`Latitude: ${latitude}`);
        console.log(`Longitude: ${longitude}`);

        return [latitude, longitude];
    } catch (error) {
        console.error("Failed to fetch location data:", error);
        throw error; // You can choose to handle the error here or propagate it up the call stack
    }
}
setInterval(timedUpdate, 1000)
function timedUpdate(){
    const curtime = document.getElementById("time")
    const greeting = document.getElementById("greetingtxt")
    const dayNightIcon = document.getElementById("dayNightIcon")
    const currentTime = new Date();
    let min = '';
    switch (currentTime.getMinutes()){
        case 0:
            min = '00'
            break
        case 1:
            min = "01"
            break
        case 2:
            min='02'
            break
        case 3:
            min='03'
            break
        case 4:
            min='04'
            break
        case 5:
            min='05'
            break
        case 6:
            min='06'
            break
        case 7:
            min='07'
            break
        case 8:
            min='08'
            break
        case 9:
            min='09'
            break
        default:
            min=currentTime.getMinutes()
            break
    }
    const time = parseInt(currentTime.getHours()) 
    if (time >= 1 && time <= 12) {
      greeting.textContent = "GOOD MORNING, IT'S CURRENTLY";
      dayNightIcon.src = './assets/desktop/icon-sun.svg'
  } else if (time >= 13 && time <= 17) {
      greeting.textContent = "GOOD AFTERNOON, IT'S CURRENTLY";
        dayNightIcon.src = './assets/desktop/icon-sun.svg'
  } else if (time >= 18 && time <= 24) {
        dayNightIcon.src = './assets/desktop/icon-moon.svg'
      greeting.textContent = "GOOD EVENING, IT'S CURRENTLY";
  }
    console.log(time)
    curtime.textContent = `${currentTime.getHours()}:${min}`

}


document.addEventListener("DOMContentLoaded", () => {
    getLatLong()
    .then(([latitude, longitude]) => {
        updateTime(latitude, longitude)
    })
    .catch(error => {
        console.log(`error with geolocating api ${error}`)
    });

  const refreshBtn = document.getElementById("refreshBtn");
  refreshBtn.addEventListener("click", () => {
    updateQuote();
  });

  updateQuote();
  updateTimezone();

});
