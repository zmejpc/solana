module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        additionalData: `@import "@/assets/scss/vars.scss";`
      },
    },
  }
}