<template>
  <header>
    <div class="container py-2">
			<div class="row">
        <div class="col-2 d-flex">
          <router-link :to="{name: 'Home'}" class="d-flex">
            <img alt="Logo" src="../assets/logo.svg" class="logo">
          </router-link>
        </div>
        <div class="col-10 d-flex justify-content-around">
          <ul class="nav">
            <li class="nav-link">
              <router-link :to="{name: 'Home'}">Home</router-link>
            </li>
            <li class="nav-link"><a href="javascript:void(0)">Portfolio</a></li>
            <li class="nav-link"><a href="javascript:void(0)">About</a></li>
          </ul>
          <Search />
        </div>
      </div>
    </div>
  </header>
</template>

<script>

import Search from './Search.vue'

export default {
  name: 'Header',
  components: {
    Search
  }
};
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 2rem;
}
.logo {
  max-width: 100px;
}
.nav-link a {
  color: $light-blue;
}
</style>
