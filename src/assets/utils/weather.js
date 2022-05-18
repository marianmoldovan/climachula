const RAIN = [
  1276, 1273, 1246, 1243, 1240, 1201, 1198, 1195, 1192, 1187, 1186, 1183, 1180,
  1153,
];
const CLOUDS = [1003, 1006, 1009, 1030];

const CLIME_IMGS = {
  sunny:
    "https://res.cloudinary.com/dleqykpqi/image/upload/v1652863341/sunny_ljfro9.jpg",
  cloudy:
    "https://res.cloudinary.com/dleqykpqi/image/upload/v1652863346/cloudy_qhxtno.jpg",
  rainy:
    "https://res.cloudinary.com/dleqykpqi/image/upload/v1652863336/rainy_udv6f8.jpg",
};

export class WeatherController {
  constructor(city = "Madrid") {
    this.city = city;
    this.temperature = null;
    this.conditionCode = null;
  }

    async retrieveData() {
      try {
        const weatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=618e9ba4df8c4682af4132516220703&q=${this.city}&aqi=no`);

        const weatherDataJson = await weatherData.json()
        this.temperature = Math.round(weatherDataJson.current.feelslike_c)
        this.conditionCode = weatherDataJson.current.condition.code;

      }
      catch (error) {
        console.error(error)
      }
    }
    getConditionImage() {
      if (CLOUDS.includes(this.conditionCode)) {
        return CLIME_IMGS.cloudy;
      } else if (RAIN.includes(this.conditionCode)) {
        return CLIME_IMGS.rainy;
      } else {
        return CLIME_IMGS.sunny;
      }
    }
}
