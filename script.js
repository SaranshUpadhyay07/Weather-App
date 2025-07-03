const weatherEmojis = {
  "clear": "☀️",
  "pcloudy": "🌤️",
  "mcloudy": "⛅",
  "cloudy": "☁️",
  "lightrain": "🌦️",
  "rain": "🌧️",
  "lightsnow": "🌨️",
  "snow": "❄️",
  "rainsnow": "🌨️🌧️",
  "ts": "⛈️",
  "tsrain": "🌩️",
  "lightra": "🌦️",
  "ishower": "🌧️",
  "oshower": "🌦️",
  "humid": "💧",
  "windy": "💨",
  "fog": "🌫️"
};
document.getElementById("citySelected").addEventListener("change", function () {
    const selectedValue = this.value;


    try {
      // Decode HTML entities first (if needed)
      const decoded = selectedValue.replace(/&quot;/g, '"');
      
      // Parse as JSON
      const coords = JSON.parse(decoded);

      // Example: Build a weather API URL or map URL
    const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${coords.lon}&lat=${coords.lat}&product=civillight&output=json`;
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data); // Contains hourly forecast points

            for (let i = 1; i <= 7; i++) {
                const forecast = data.dataseries[i - 1];
                
                const rawDate = forecast.date.toString();
                const year = rawDate.substring(0, 4);
                const month = rawDate.substring(4, 6);
                const day = rawDate.substring(6, 8);
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const formattedDate = `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
                
                document.getElementById(`entire-card${i}`).classList.remove("d-none");
                document.getElementById(`card-heading${i}`).innerHTML = `
                    <strong>${formattedDate}</strong><br>`;
                document.getElementById(`card-weather${i}`).innerHTML = data.dataseries[i-1].weather;
                const emoji = weatherEmojis[forecast.weather] || "🌈"; // fallback if not found
                document.getElementById(`card-icon${i}`).innerHTML = `${emoji}`;
                document.getElementById(`card-temp${i}`).innerHTML ="Min: " + data.dataseries[i-1].temp2m.max+"°C<br>Max: "+data.dataseries[i-1].temp2m.min+"°C<br>Wind: " + data.dataseries[i-1].wind10m_max + " m/s";
            }
        });

    } catch (err) {
      console.error("Error parsing coordinates:", err);
    }
  });


