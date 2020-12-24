<template>
  <div class="flex-box center">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <button v-bind:class="[(lamp === 1) ? 'light-button' : 'off-button']" @click="switchLamp">{{ buttonTexts.lamp }}</button>
          <button v-bind:class="[(rgb.red === 1) ? 'light-button' : 'off-button']" @click="switchRed">{{ buttonTexts.red }}</button>
          <button v-bind:class="[(rgb.green === 1) ? 'light-button' : 'off-button']" @click="switchGreen">{{ buttonTexts.green }}</button>
          <button v-bind:class="[(rgb.blue === 1) ? 'light-button' : 'off-button']" @click="switchBlue">{{ buttonTexts.blue }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { lampSocket, rgbSocket } from '../socket'

export default {
  name: 'home',
  data: () => {
    return {
      rgb: {
        red: 0,
        green: 0,
        blue: 0
      },
      lamp: 0,
      buttonTexts: {
        lamp: 'Turn On Lamp',
        red: 'Turn On Red',
        green: 'Turn On Green',
        blue: 'Turn On Blue'
      }
    }
  },
  methods: {
    switchRed () {
      this.emitRGBEvent('change_red')
    },
    switchBlue () {
      this.emitRGBEvent('change_blue')
    },
    switchGreen () {
      this.emitRGBEvent('change_green')
    },
    switchLamp () {
      this.emitLampEvent('change_lamp')
    },
    updateRed () {
      this.buttonTexts.red = this.rgb.red === 1 ? 'Turn Off Red' : 'Turn On Red'
    },
    updateGreen () {
      this.buttonTexts.green = this.rgb.green === 1 ? 'Turn Off Green' : 'Turn On Green'
    },
    updateBlue () {
      this.buttonTexts.blue = this.rgb.blue === 1 ? 'Turn Off Blue' : 'Turn On Blue'
    },
    updateLamp () {
      this.buttonTexts.lamp = this.lamp === 1 ? 'Turn Off Lamp' : 'Turn On Lamp'
    },
    emitRGBEvent (eventName) {
      this.$http.get('/rgb/red')
        .then(res => {
          rgbSocket.emit(eventName, { 'token': this.$store.getters.token })
        })
        .catch(error => console.log(error))
    },
    emitLampEvent (eventName) {
      this.$http.get('/lamp')
        .then(res => {
          lampSocket.emit(eventName, { 'token': this.$store.getters.token })
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.$http.get('/rgb/red')
      .then(res => {
        this.rgb.red = res.data
        this.updateRed()
      })
      .catch(error => console.log(error))
    this.$http.get('/rgb/green')
      .then(res => {
        this.rgb.green = res.data
        this.updateGreen()
      })
      .catch(error => console.log(error))
    this.$http.get('/rgb/blue')
      .then(res => {
        this.rgb.blue = res.data
        this.updateBlue()
      })
      .catch(error => console.log(error))
    this.$http.get('/lamp')
      .then(res => {
        this.lamp = res.data
        this.updateLamp()
      })
      .catch(error => console.log(error))
  },
  mounted () {
    const that = this
    rgbSocket.on('state', (data) => {
      if (data.hasOwnProperty('red')) {
        that.rgb.red = data.red
        that.updateRed()
      }
      if (data.hasOwnProperty('green')) {
        that.rgb.green = data.green
        that.updateGreen()
      }
      if (data.hasOwnProperty('blue')) {
        that.rgb.blue = data.blue
        that.updateBlue()
      }
    })
    lampSocket.on('state', (data) => {
      if (data.hasOwnProperty('lamp')) {
        that.lamp = data.lamp
        that.updateLamp()
      }
    })
  }
}
</script>
<style lang="scss">
  button {
    border-width: 0;
  }
  .light-button {
    background-color: #e7ffac;
    box-shadow:
      0 0 0.1rem 0.3rem #e7ffac,  /* inner white */
      0 0 0.3rem 0.45rem #fffe91, /* middle magenta */
      0 0 0.45rem 0.6rem #000000; /* outer cyan */
  }
  .off-button {
    background-color: #c9cbff;
    box-shadow:
      0 0 0.1rem 0.45rem #c9cbff,
      0 0 0.45rem 0.6rem #000000; /* outer cyan */
  }
</style>
