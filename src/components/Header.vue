<template>
  <div id="header">
    <app-temperature v-if="auth"/>
    <nav>
      <div id="navbar-list">
        <ul>
          <li v-if="showHamburger">
            <a href="#" id="hamburger" v-bind:class="{ open: showSidebar }" v-on:click.prevent="toggleSidebar">
                <div class="hamburger-element"></div>
                <div class="hamburger-element"></div>
                <div class="hamburger-element"></div>
            </a>
          </li>
          <li><a href="#">Lights Controller</a></li>
        </ul>
        <app-links v-if="!showHamburger"></app-links>
      </div>
      <transition name="sidebar-fade" mode="out-in">
        <app-sidebar v-if="showSidebar"></app-sidebar>
      </transition>
    </nav>
  </div>
</template>

<script>
import router from '../router'
import Sidebar from './Sidebar'
import NavLinks from './NavLinks'
import TemperatureBanner from './TemperatureBanner'
import sideBarControlService from '../services/SideBarControlService'

export default {
  name: 'Header',
  data: () => {
    return {
      showSidebar: false
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuth
    },
    showHamburger () {
      return this.$store.getters.isSmallWidth
    }
  },
  methods: {
    logout () {
      this.showSidebar = false
      this.$store.dispatch('logout')
        .then(() => router.replace('/login'))
    },
    toggleSidebar () {
      sideBarControlService.setSideBarState(!this.showSidebar)
    },
    handleOutsideClick (e) {
      e.stopPropagation()
      sideBarControlService.setSideBarState(false)
    }
  },
  components: {
    'app-sidebar': Sidebar,
    'app-links': NavLinks,
    'app-temperature': TemperatureBanner
  },
  created () {
    this.subscription = sideBarControlService.getSideBarState().subscribe(
      message => {
        this.showSidebar = message.isClosed
      })
  },
  beforeDestroy () {
    this.subscription.unsubscribe()
  },
  watch: {
    showHamburger (newValue) {
      if (newValue === false) {
        this.showSidebar = false
      }
    }
  }
}
</script>

<style lang="scss">
  .sidebar-fade-enter-active {
    animation: fade-out-animation;
    animation-timing-function: ease-in-out;
    animation-duration: .1s;
  }

  .sidebar-fade-leave-active {
    animation: fade-out-animation reverse;
    animation-timing-function: ease-in-out;
    animation-duration: .1s;
  }

  $numberOfFrames: 10;
  $changeOfPositionPerFrame: 10%;
  @keyframes fade-out-animation {
    @for $i from 0 to $numberOfFrames {
      $current-frame: $i * $changeOfPositionPerFrame;
      $next-frame: ($i + 1) * $changeOfPositionPerFrame;
      #{$current-frame, $next-frame} {
        transform: translateX($current-frame - 100%);
        opacity: $current-frame;
      }
      $halfway-frame: 50%;
      @if $i > 0 {
        #{$halfway-frame} {
          filter: blur(2px);
        }
      }
    }
  }

  #header {
    position: fixed;
    top: 0;
    width: 100%;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  li {
    float: left;
  }

  li a {
    color: white;
    display: block;
    text-align: center;
    padding: 1rem 1rem 0.7rem 1rem;
    text-decoration: none;
  }

  nav {
    background-color: green;
    height: 3rem;
    width: 100%;
  }

  #navbar-list {
    display: flex;
    align-items: baseline;
    justify-content: left;
    flex-direction: row;
  }

  li a:hover {
    background-color: #555;
    color: white;
  }

  .hamburger-element {
    width: 35px;
    height: 4px;
    background-color: black;
    margin: 6px 0;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  #hamburger {
    padding: 0.5rem 1rem 0.1rem 1rem;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
  }

  #hamburger.open {
    div {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      display: block;
      opacity: 1;
      -webkit-transition: .25s ease-in-out;
      -moz-transition: .25s ease-in-out;
      -o-transition: .25s ease-in-out;
      transition: .25s ease-in-out;
    }
    div:first-of-type {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg) translateY(-3px);
    }
    div:nth-of-type(2) {
      width: 0;
      opacity: 0;
    }
    div:last-of-type {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg) translateY(4px);
    }
  }
  /*.active {*/
    /*background-color: #4CAF50;*/
    /*color: white;*/
  /*}*/

</style>
