<template>
  <footer class="mt-5">
    <div class="container py-2 text-center">
      GAURIZ © {{ year }} GAURIZ INC. ALL RIGHTS RESERVED.
    </div>
  </footer>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return {
      year: (new Date).getFullYear()
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  font-size: 11px;
  background-color: $black;
  color: #fff;
}
</style>
