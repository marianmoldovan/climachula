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
import { WeatherController } from "../assets/utils/weather";
const weatherController = new WeatherController();

export default {
  name: "Climachula",
  data() {
    return {
      temperature: 0,
      climeImage: this.climeImage,
    };
  },
  async mounted() {
    await this.renderClimeConditions();
    setInterval(this.renderClimeConditions, 3600000);
  },
  methods: {
    async renderClimeConditions() {
      await weatherController.retrieveData();
      this.temperature = weatherController.temperature;
      this.climeImage = weatherController.getConditionImage();
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
  font-size: 2.7rem;
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
  top: 286px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.down {
  margin-top: 40px;
}

/* Media queries */
@media (min-width: 600px) {
  .flex {
    top: 245px;
  }
}
@media (min-width: 768px) {
  .flex {
    top: 130px;
  }
}
@media (min-width: 900px) {
  .flex {
    top: 178px;
  }
}
@media (min-width: 1024px) {
  .flex {
    top: 118px;
  }
}
@media (min-width: 1100px) {
  .flex {
    top: 230px;
  }
}
@media (min-width: 1450px) {
  .flex {
    bottom: 100px;
  }
}
@media (min-width: 1700px) {
  .flex {
    bottom: 100px;
  }
}
</style>
