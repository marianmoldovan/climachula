<template>
  <div class="container">
    <img :src="climeImage" alt="image of weather now" />
    <div class="flex">
      <p>{{ dayOfWeek }},</p>
      <p>{{ dateOfToday }}</p>
      <p>{{ temperature }}º</p>
    </div>
  </div>
</template>

<script>
const WEEKDAY = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
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

export default {
  name: "HelloWorld",
  data() {
    return {
      temperature: 0,
      climeImage: this.climeImage,
    };
  },
  mounted() {
    this.getWeather();
    setInterval(this.getWeather, 3600000);
  },
  methods: {
    getWeather() {
      fetch(
        "https://api.weatherapi.com/v1/current.json?key=618e9ba4df8c4682af4132516220703&q=Madrid&aqi=no"
      )
        .then((response) => response.json())
        .then((data) => {
          const temperature = Math.round(data.current.feelslike_c);
          this.temperature = temperature;
          console.log(data);

          const code = data.current.condition.code;

          if (CLOUDS.includes(code)) {
            this.climeImage = CLIME_IMGS.cloudy;
          } else if (RAIN.includes(code)) {
            this.climeImage = CLIME_IMGS.rainy;
          } else {
            this.climeImage = CLIME_IMGS.sunny;
          }
        });
    },
  },
  computed: {
    dayOfWeek: function () {
      const day = new Date().getDay();
      return WEEKDAY[day];
    },
    dateOfToday: function () {
      const dateOfMonth = new Date().getDate();
      const monthOfYear = new Date().getMonth();
      return `${dateOfMonth} de ${MONTHS[monthOfYear]}`;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: "Chulapa";
  font-size: 2.5rem;
  font-weight: 600;
  width: 450px;
  height: 450px;
  margin: 20px auto;
  /*   background-image: url(../assets/img.jpg);
  background-size: contain;
  background-repeat: no-repeat; */
  border: 1px solid rgba(128, 128, 128, 0.797);
  box-shadow: 5px 5px 15px 3px rgba(128, 128, 128, 0.797);
}

p {
  margin: 2px auto;
  text-align: center;
}
.flex {
  height: 30%;
  width: 100%;
  position: absolute;
  top: 288px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.down {
  margin-top: 40px;
}
</style>
