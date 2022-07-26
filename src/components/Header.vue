<template>
  <header>
    <div class="container">
			<router-link :to="{name: 'Home'}">
				<img alt="Logo" src="../assets/logo.png" class="logo">
      </router-link>	
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 2rem;
}
.logo {
  max-width: 100px;
}
</style>
