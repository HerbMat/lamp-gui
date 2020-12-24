<template>
  <div class="row" id="temp-bar">
    <span class="row">
      <span v-bind:class="{ 'row center text-center': formatTemperatureTextToRows }">Celsius: {{ formatTemperature(celsiusTemperature) }} &deg;C </span>
      <span v-bind:class="{ 'row center text-center': formatTemperatureTextToRows }">Fahrenheit: {{ formatTemperature(fahrenheitTemperature) }} &deg;F </span>
      <span v-bind:class="{ 'row center text-center': formatTemperatureTextToRows }">Kelvin: {{ formatTemperature(kelvinTemperature) }} &deg;K </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TemperatureBanner',
  data: () => {
    return {
      kelvinTemperature: 0,
      fahrenheitTemperature: 0,
      celsiusTemperature: 0
    }
  },
  computed: {
    formatTemperatureTextToRows () {
      return this.$store.getters.isSmallWidth
    }
  },
  methods: {
    formatTemperature (temperature) {
      return temperature.toFixed(2)
    }
  },
  created () {
    const that = this
    this.$http.get('/temperature/celsius').then((data) => {
      that.celsiusTemperature = data.data
    })
    this.$http.get('/temperature/fahrenheit').then((data) => {
      that.fahrenheitTemperature = data.data
    })
    this.$http.get('/temperature/kelvin').then((data) => {
      that.kelvinTemperature = data.data
    })
  }
}
</script>

<style scoped>
  #temp-bar {
    display: flow-root;
    background-color: green;
    border: 2px groove forestgreen;
  }

  #temp-bar > * {
    margin-left: auto;
    margin-right: 0;
    float: right;
    /*background-color: green;*/
  }
  #temp-bar > span > * {
    margin-left: 0.5rem;
    float: right;
  }
</style>
