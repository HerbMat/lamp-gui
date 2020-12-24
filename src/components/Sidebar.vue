<template>
  <div id="sidebar" v-on-clicked-outside="handleOutsideClick">
    <app-links slot="items" @onClick="toggleSidebar"></app-links>
  </div>

</template>

<script>
import NavLinks from './NavLinks'
import sideBarControlService from '../services/SideBarControlService'

export default {
  name: 'SideBar',
  data: () => {
    return {}
  },
  methods: {
    handleOutsideClick (event) {
      event.stopPropagation()
      const sidebar = document.getElementById('sidebar')
      const hamburger = document.getElementById('hamburger')
      if (!((sidebar !== null) && (sidebar === event.target || sidebar.contains(event.target))) &&
          !(hamburger === event.target || hamburger.contains(event.target))) {
        sideBarControlService.setSideBarState(false)
      }
    },
    toggleSidebar () {
      sideBarControlService.setSideBarState(false)
    }
  },
  components: {
    'app-links': NavLinks
  },
  directives: {
    onClickedOutside: {
      bind (el, binding, vnode) {
        document.addEventListener('click', binding.value)
      },
      unbind (el, binding) {
        document.body.removeEventListener('click', binding.value)
      }
    }
  }
}
</script>

<style lang="scss">
  #sidebar {
    padding: 0;
    width: 14rem;
    background-color: green;
    position: fixed;
    height: 100vh;
    overflow: auto;
    align-items: normal;
    -webkit-box-shadow: 9px 3px 20px 0px rgba(0, 0, 0, 1);
    -moz-box-shadow: 9px 3px 20px 0px rgba(0, 0, 0, 1);
    box-shadow: 9px 3px 20px 0px rgba(0, 0, 0, 1);

  }

  #sidebar > ul {
    display: table;
    justify-content: center;
    li {
      width: 100%;
    }
  }
</style>
