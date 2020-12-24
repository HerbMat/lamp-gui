<template>
  <div class="flex-box center">
    <div class="container">
      <h1>Weather</h1>
      <div v-if="weather.loading">
        <div class="loader">Loading...</div>
      </div>
      <div v-else>
        <div v-for="reading in weather.readings" :key="reading" class="reading">
          <p>Time:</p>
          <p>{{ renderReadingDate(reading.timepoint) }}</p>
          <p>Weather type:</p>
          <p>{{ reading.weather }}</p>
          <p>Temperature:</p>
          <p>{{ reading.temp2m }} &deg;C</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import geoLocationIp from '../api/geolocation-axios'
import weatherLocationIp from '../api/weather-api-axios'
import formatDate from '../formatDate'

export default {
  name: 'Weather',
  data: () => {
    return {
      location: {
        latitude: 0,
        longitude: 0
      },
      weather: {
        loading: true,
        initDate: null,
        readings: []
      }
    }
  },
  methods: {
    renderReadingDate (additionalHours) {
      const readingDate = new Date(this.weather.initDate)
      readingDate.setHours(readingDate.getHours() + additionalHours)

      return readingDate
    }
  },
  created () {
    const that = this
    geoLocationIp.get().then(function (response) {
      const data = response.data
      that.location.latitude = data.lat
      that.location.longitude = data.lon
      weatherLocationIp.get('', {
        crossdomain: true,
        params: {
          'lat': data.lat,
          'lon': data.lon
        }
      }).then(function (response) {
        that.weather.initDate = formatDate(response.data.init)
        that.weather.readings = response.data.dataseries.map(({ timepoint, weather, temp2m, ...rest }) => {
          return { timepoint, weather, temp2m }
        })
      }).then(() => { that.weather.loading = false })
    })
  }
}
</script>

<style scoped>
  h1 {
    text-align: center;
  }

  .reading {
    -webkit-box-shadow: 11px 13px 9px 2px rgba(52, 153, 104, 1);
    -moz-box-shadow: 11px 13px 9px 2px rgba(52, 153, 104, 1);
    box-shadow: 11px 13px 9px 2px rgba(52, 153, 104, 1);
    border: 1px solid aquamarine;
    padding: 10px;
    margin: 20px;
    min-width: 12rem;
  }

  .reading:after {
    content: "";
    display: table;
    clear: both;
  }

  .reading > p {
    float: left;
    width: 50%;
    min-width: 12rem;
  }

  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: #2d18e7;
    background: -moz-linear-gradient(left, #2d18e7 10%, rgba(45, 24, 231, 0) 42%);
    background: -webkit-linear-gradient(left, #2d18e7 10%, rgba(45, 24, 231, 0) 42%);
    background: -o-linear-gradient(left, #2d18e7 10%, rgba(45, 24, 231, 0) 42%);
    background: -ms-linear-gradient(left, #2d18e7 10%, rgba(45, 24, 231, 0) 42%);
    background: linear-gradient(to right, #2d18e7 10%, rgba(45, 24, 231, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .loader:before {
    width: 50%;
    height: 50%;
    background: #2d18e7;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
