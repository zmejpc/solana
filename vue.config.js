module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        data: `@import "@/assets/scss/vars.scss";`
      },
    },
  }
}